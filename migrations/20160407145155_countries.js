
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('countries', function(table){
			table.string('name');
			table.boolean('active').notNullable().defaultTo(true);
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	]);
};

exports.down = function(knex, Promise) {
 	return Promise.all([ knex.schema.dropTableIfExists('countries') ]);
};