exports.up = function(knex) {
  
    return knex.schema.createTable("todos", table => {

        table.increments("id").primary(),
        table.text("task", 200),
        table.date("created_at"),
        table.date("updated_at"),
        table.boolean("completed").defaultTo(false),
        table.boolean("active").defaultTo(false),
        table.integer("priority"),
        table.string("user_uid").references("users.uid")

    })

};

exports.down = function(knex) {
    return knex.schema.dropTable('todos');
};
