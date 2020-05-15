const express = require("express");
const Tasks = require("./model");
const router = express.Router();
//gets all tasks in the db
router.get("/", (req, res) => {
  Tasks.find()
    .then((tasks) => {
      // the tasksB maps over the tasks object spreads in all tasks and if task.completed is a 1 or 0 it will convert to Boolean value
      const tasksB = tasks.map((task) => ({
        ...task,
        completed: Boolean(task.completed),
      }));
      res.status(200).json(tasksB);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "unable to get all tasks from the database" });
    });
});
//get tasks by their id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Tasks.findById(id)
    .then((task) => {
      if (task) {
        const tasksB = { ...task, completed: Boolean(task.completed) };
        res.status(200).json(tasksB);
      } else {
        res.status(404).json({ message: "task not found in our database" });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "unable to get tasks" });
    });
});
//post a tasks to the database
router.post("/", (req, res) => {
  const taskData = req.body;
  Tasks.add(taskData)
    .then((task) => {
      const tasksB = { ...task, completed: Boolean(task.completed) };
      res.status(201).json(tasksB);
    })
    .catch(() => {
      res.status(500).json({
        error: "unable to add new task to add a task to our data base",
      });
    });
});
module.exports = router;