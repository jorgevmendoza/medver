
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('entities_requests', function(table){
			table.increments('id').primary();
			table.integer('ent_ref_from_id').references('entities.id').index();
      		table.integer('ent_ref_to_id').references('entities.id').index();
			table.boolean('active').notNullable().defaultTo(true);
			table.integer('created_by').references('users.id').index();
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	]);
};

exports.down = function(knex, Promise) {
  	return Promise.all([
		knex.schema.dropTableIfExists('entities_requests')
	])
};
