
exports.up = function(knex, Promise) {
   return Promise.all([
		knex.schema.createTable('groups', function(table){
			table.increments('id').primary();
			table.string('name');
			table.boolean('active').notNullable().defaultTo(true);
      table.integer('participant_team');
      table.integer('classified_team');
			table.integer('phase_id').references('phases.id').index();
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
		.then(function(){
			//Add query
            return knex.raw('');
        })
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.dropTableIfExists('groups') ]);
};
