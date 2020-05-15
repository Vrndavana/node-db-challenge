const express = require("express");
const Resources = require("./model");
const router = express.Router();
//get all resources
router.get("/", (req, res) => {
  Resources.find()
    .then((resources) => {
      res.status(200).json(resources);
    })
    .catch(() => {
      res.status(500).json({ error: "unable to fetch all resources" });
    });
});
//get resources by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Resources.findById(id)
    .then((resource) => {
      if (resource) {
        res.status(200).json(resource);
      } else {
        res.status(404).json({ message: "resource not found" });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "unable to get resource" });
    });
});
//post resource to the data base
router.post("/", (req, res) => {
  const resourceData = req.body;
  Resources.add(resourceData)
    .then((resource) => {
      res.status(201).json(resource);
    })
    .catch(() => {
      res.status(500).json({ error: "unable to add new resource" });
    });
});
// router.post('/:id/task', (req, res) => {
//   const taskData = req.body
//   const id = req.params.id
//   taskData.project_id = id
//   Projects.getProject(id)
//   .then(response => {
//     if(!response) {
//       res.status(404).json({ message: 'no project in our db by that id', data: response })
//     } else {
//       if(taskData) {
//         Projects.taskData(taskData)
//         .then(response => {
//           res.status(201).json(response)
//         })
//         .catch(err => {
//           res.status(500).json({ message: 'Failed to add task to that project', data: err })
//         })
//       } else {
//         res.status(400).json({ message: 'Missing body' })
//       }
//     }
//   })
// })
module.exports = router;