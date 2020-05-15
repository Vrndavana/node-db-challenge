exports.up = function(knex) {
    return knex.schema
    .createTable("project_resources", project_resources => {
      project_resources.increments();
      project_resources
      .integer("project_id")
      .notNullable()
      .references("id")
      .inTable("projects")
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
      project_resources
      .integer("resource_id")
      .notNullable()
      .references("id")
      .inTable("resources")
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    })
  };
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('project_resources')
  };