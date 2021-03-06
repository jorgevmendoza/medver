exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('tipo_consultas', function(table){
			table.increments('id').primary();
			table.text('descripcion');
			// table.text('tratamiento');
			table.boolean('active').notNullable().defaultTo(true);
      table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.dropTableIfExists('tipo_consultas') ]);
};
