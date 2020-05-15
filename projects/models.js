const db = require("../data/dbconfig");

module.exports = {
  getProjects,
  findById,
  getResources,
  addProject,
  getTasks,
  update,
};
function getProjects() {
  return db("projects");
}
function findById(id) {
  return db("projects")
    .where({ id: Number(id) })
    .first();
}
function getResources(id) {
  return db("project_resources as pr")
    .select("r.name as resource_name", "r.description as resource_description")
    .join("resources as r", "pr.resource_id", "r.id")
    .where("pr.project_id", id);
}
function addProject(project) {
    console.log(project)
  return db("projects")
    .insert(project, "id")
    .then((id) => {
      return findById(id);
    });
}
function getTasks(id) {
  const project_id = Number(id);
  return db("tasks")
    .select(
      "projects.name",
      "projects.description as project_description",
      "tasks.notes",
      "tasks.id",
      "tasks.project_id"
    )
    .join("projects", "tasks.project_id", "projects.id")
    .where({ project_id });
}
// function getTasks(id) {
//   return db('projects AS p')
//   .join('tasks AS t', 't.project_id', 'p.id')
//   .select('p.name', 'p.description', 't.description', 't.notes', 't.completed')
//   .where('t.project_id', id)
//   }
function update(id, changes) {
  return db("projects")
    .where("id", id)
    .update(changes)
    .then((count) => (count > 0 ? findById(id) : null));
}