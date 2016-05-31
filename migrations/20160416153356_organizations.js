
exports.up = function(knex, Promise) {

	return Promise.all([
		knex.schema.createTable('organizations', function(table){
			table.increments('id').primary();
			table.string('name').notNullable().unique();
			table.text('description');
			table.timestamp('foundation_date');
			table.integer('organization_type_id').references('organizations_types.id').index();
			table.boolean('active').notNullable().defaultTo(true);
			// table.integer('contact_id').references('contacts.id').index();
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	]);

};

exports.down = function(knex, Promise) {
 	return Promise.all([ knex.schema.dropTableIfExists('organizations') ]);
};