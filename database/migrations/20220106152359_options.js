exports.up = function(knex) {
    return knex.schema.createTable('options', (table) => {
        table.increments();
        table.string('key').notNullable();
        table.text('value').notNullable();
        table.integer('status').defaultTo(1);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    })
  };
  
exports.down = function(knex) {
    return knex.schema.dropTable('options')
};