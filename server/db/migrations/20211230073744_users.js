exports.up = function(knex) {
  
    return knex.schema.createTable("users", table => {

        table.increments("id").primary()
        table.string("uid").unique()
        table.string('name').notNullable()
        table.string("email").unique()
        table.string("password").notNullable()
        table.date("created_at")
        table.date("updated_at")

    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
