exports.up = function(knex) {
    return knex.schema
    .createTable("resources", resources => {
      resources.increments();
      resources.string("name", 255).unique().notNullable();
      resources.string("description", 255);
    })
  };
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('resources')
  };