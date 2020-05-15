const db = require("../data/dbconfig");
module.exports = {
  find,
  findById,
  add,
};
function find() {
  return db("tasks")
    .select(
      "projects.name",
      "projects.description as project_description",
      "tasks.notes",
      "tasks.id",
      "tasks.project_id"
    )
    .join("projects", "tasks.project_id", "projects.id");
}
function findById(id) {
  const task_id = parseInt(id);
  return db("tasks")
    .select(
      "projects.name",
      "projects.description as project_description",
      "tasks.notes",
      "tasks.id",
      "tasks.project_id"
    )
    .join("projects", "tasks.project_id", "projects.id")
    .where("tasks.id", task_id)
    .first();
}
function add(task) {
  return db("tasks")
    .insert(task, "id")
    .then((ids) => {
      const [id] = ids;
      return findById(id);
    });
}