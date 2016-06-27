
console.log(__filename.slice(__dirname.length + 1) + ' START')

console.log('9013 start')
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('competitions_roles_organizations').del(),
    // Inserts seed entries
    knex('competitions_roles_organizations').insert({competition_id: 1, organization_id:1, rol_id:3})
  );
};
console.log('9013 OK')

console.log(__filename.slice(__dirname.length + 1) + ' OK')