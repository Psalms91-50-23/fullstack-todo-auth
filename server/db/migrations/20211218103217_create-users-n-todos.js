
exports.up = function(knex) {
  
    return knex.schema.createTable("users", table => {

        table.increments("id").primary()
        table.string("uid")
        table.string('name').notNullable()
        table.string("email").unique().notNullable()
        table.string("password").notNullable()
        table.string("created_at")
        table.string("updated_at")

    }).createTable("todos", table => [

        table.increments("id").primary(),
        table.text("task", 200).notNullable(),
        table.string("created_at"),
        table.string("updated_at"),
        table.boolean("completed").defaultTo(false),
        table.boolean("active").defaultTo(false),
        table.boolean("priority").defaultTo(false),
        table.integer("user_uid")
        .unsigned()
        .notNullable()
        .references("uid")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")

    ])

};

exports.down = function(knex) {

    return knex.schema.dropTableIfExists("todos").dropTableIfExists("users")

};
