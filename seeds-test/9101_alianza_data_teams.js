
console.log(__filename.slice(__dirname.length + 1) + ' START')

exports.seed = function(knex, Promise) {

  knex.select('title', 'author', 'year').from('books')

  return Promise.join(
    //==========================================================================
    // Team 1: Cholitas - Teams
    //==========================================================================
    knex('teams').insert({name: 'Cholitas', short_name:'Xolas', description:'Cholitas Prueba Alianza Atlanta', logo_url:'', category_type_id:10, organization_id:5, subdiscipline_id:2, gender_id:3}),
    //==========================================================================
    // Team 2: Coesta Checa - Teams
    //==========================================================================
    knex('teams').insert({name: 'Costa Chica', short_name:'CC', description:'Costa Chica Alianza Atlanta', logo_url:'', category_type_id:10, organization_id:6, subdiscipline_id:2, gender_id:3}),
    //==========================================================================
    // Team 3: Norcross Eagles - Teams
    //==========================================================================
    knex('teams').insert({name: 'Norcross Eagles', short_name:'NE', description:'Norcross Eagles Prueba Alianza Atlanta', logo_url:'', category_type_id:10, organization_id:7, subdiscipline_id:2, gender_id:3}),
    //==========================================================================
    // Team 4: Sur Carolina (Del) - Teams
    //==========================================================================
    knex('teams').insert({name: 'Sur Carolina (Del)', short_name:'SD', description:'Sur Carolina (Del) Prueba Alianza Atlanta', logo_url:'', category_type_id:10, organization_id:8, subdiscipline_id:2, gender_id:3}),
    //==========================================================================
    // Team 5: United Academia - Teams
    //==========================================================================
    knex('teams').insert({name: 'United Academia', short_name:'UA', description:'United Academia Prueba Alianza Atlanta', logo_url:'', category_type_id:10, organization_id:9, subdiscipline_id:2, gender_id:3}),
    //==========================================================================
    // Team 6: Archi - Teams
    //==========================================================================
    knex('teams').insert({name: 'Archi', short_name:'ARCHI', description:'Archi Prueba Alianza Atlanta', logo_url:'', category_type_id:10, organization_id:10, subdiscipline_id:2, gender_id:3}),
    //==========================================================================
    // Team 7: Fusion - Organizations
    //==========================================================================
    knex('teams').insert({name: 'Fusion', short_name:'FUSION', description:'Fusion Prueba Alianza Atlanta', logo_url:'', category_type_id:10, organization_id:11, subdiscipline_id:2, gender_id:3}),
    //==========================================================================
    // Team 8: Pedro Espinoza - Organizations
    //==========================================================================
    knex('teams').insert({name: 'Pedro Espinoza', short_name:'PE', description:'Pedro Espinoza Prueba Alianza Atlanta', logo_url:'', category_type_id:10, organization_id:12, subdiscipline_id:2, gender_id:3})
  )
}



console.log(__filename.slice(__dirname.length + 1) + ' OK')