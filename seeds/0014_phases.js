
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('phases').del(),
    /*

      table.integer('position');
      table.integer('participant_team');
      table.integer('classified_team');
      table.boolean('active').notNullable().defaultTo(true);
      table.integer('category_id').references('categories.id').index();
      table.integer('previus').references('phases.id').index();
      table.integer('next').references('phases.id').index();
    */
    // Inserts seed entries
    knex('phases').insert({id: 1, name: 'Apertura', position:0, category_season_id:1, participant_team:4, classified_team:2}),
    knex('phases').insert({id: 2, name: 'Clausura', position:1, category_season_id:1, participant_team:2, classified_team:1})
  );
};
