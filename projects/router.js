const express = require("express");
const router = express.Router();
const Projects = require("./models");
//get projets
router.get("/", (req, res) => {
  Projects.getProjects()
    .then((projects) => {
      projects.map((project) => {
        if (project.completed === 0) {
          project.completed = false;
        }
        project.completed = true;
      });
      res.status(200).json({ Projects: projects });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Failed to get projects from data base" });
    });
});
// get projets by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Projects.findById(id)
    .then((project) => {
      if (project) {
        res.json(project);
      } else {
        res
          .status(404)
          .json({ message: "Could not find project with given id." });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get project" });
    });
});
//get resources by project_id
router.get("/:id/resources", (req, res) => {
  const { id } = req.params;
  Projects.getResources(id)
    .then((resources) => {
      if (resources.length) {
        return res.json({ resources: resources });
      }
      return res
        .status(404)
        .json({ message: "Could not find resources for given project id" });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: "Failed to get resources for given project id" });
    });
});
// get tasks for project_id
router.get("/:id/tasks", (req, res) => {
  const { id } = req.params;
  Projects.getTasks(id)
    .then((tasks) => {
      const tasksBool = tasks.map((task) => ({
        ...task,
        completed: Boolean(task.completed),
      }));
      res.status(200).json(tasksBool);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "unable to get tasks for this project at that id " });
    });
});
// post project to data base
router.post("/", (req, res) => {
  const projectData = req.body;
  Projects.addProject(projectData)
    .then((project) => {
      if (!project.name) {
        res.status(400).json({
          errorMessage:
            "Name for the project is required.. you may choose not to describe the project if you want",
        });
      } else {
        res.status(201).json({ data: project });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: error });
    });
});
//change project by id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Projects.findById(id)
    .then((project) => {
      console.log(project);
      if (project) {
        Projects.update(id, changes).then((updatedProject) => {
          res.status(200).json(updatedProject);
        });
      } else {
        res
          .status(404)
          .json({ message: "could not find project with that id" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "failed" });
    });
});

module.exports = router;