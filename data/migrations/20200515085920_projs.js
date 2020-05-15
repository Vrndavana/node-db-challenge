exports.up = function(knex) {
    return knex.schema
    .createTable("projects", projects => {
      projects.increments();
      projects.string("name", 255).unique().notNullable();
      projects.string("description", 255);
      projects.boolean("completed").notNullable();
    })
  };
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('projects')
  };