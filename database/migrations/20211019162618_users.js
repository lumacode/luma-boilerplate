exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.string('lastname').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.string('token');
      table.integer('rol').defaultTo(0);
      table.integer('status').defaultTo(1);
      table.integer('deleted').defaultTo(0);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
