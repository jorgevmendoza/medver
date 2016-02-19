
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('disciplines', function(table){
			table.increments('id');
			table.string('name').notNullable();
			table.text('description').notNullable();
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.dropTableIfExists('disciplines') ]);
};