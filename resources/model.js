const db = require("../data/dbconfig");
module.exports = {
  find,
  findById,
  add,
};
function find() {
  return db("resources");
}
function findById(id) {
  const project_id = parseInt(id);
  return db("resources").where({ id: project_id }).first();
}
function add(resource) {
  return db("resources")
    .insert(resource, "id")
    .then((ids) => {
      const [id] = ids;
      return findById(id);
    });
}