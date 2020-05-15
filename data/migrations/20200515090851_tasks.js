exports.up = function(knex) {
    return knex.schema
    .createTable("tasks", tasks => {
      tasks.increments();
      tasks.string("description", 255).notNullable();
      tasks.string("notes").notNullable();
      tasks.boolean("completed").notNullable();
      
      tasks.integer("project_id").notNullable()
      .references("id")
      .inTable("projects")
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    })
  };
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('tasks')
  };