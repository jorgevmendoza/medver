
console.log(__filename.slice(__dirname.length + 1) + ' START')

console.log('0023 seeding players_teams')
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('players_teams').del(),

    // Inserts seed entries
    //Team 1
    knex('players_teams').insert({player_id:1, team_id:1, number:1,position:'P'}),
    knex('players_teams').insert({player_id:2, team_id:1, number:5,position:'D'}),
    knex('players_teams').insert({player_id:3, team_id:1, number:7,position:'D'}),
    knex('players_teams').insert({player_id:4, team_id:1, number:8,position:'P'}),
    knex('players_teams').insert({player_id:5, team_id:1, number:2,position:'M'}),
    knex('players_teams').insert({player_id:6, team_id:1, number:10,position:'D'}),
    knex('players_teams').insert({player_id:7, team_id:1, number:9,position:'D'}),
    knex('players_teams').insert({player_id:8, team_id:1, number:3,position:'M'}),
    knex('players_teams').insert({player_id:9, team_id:1, number:11,position:'M'}),
    knex('players_teams').insert({player_id:10, team_id:1, number:4,position:'DEL'}),
    // //Team 2
    knex('players_teams').insert({player_id:11, team_id:2, number:13,position:'M'}),
    knex('players_teams').insert({player_id:12, team_id:2, number:7,position:'DEL'}),
    knex('players_teams').insert({player_id:13, team_id:2, number:3,position:'D'}),
    knex('players_teams').insert({player_id:14, team_id:2, number:2,position:'DEL'}),
    knex('players_teams').insert({player_id:15, team_id:2, number:5,position:'D'}),
    knex('players_teams').insert({player_id:16, team_id:2, number:17,position:'M'}),
    knex('players_teams').insert({player_id:17, team_id:2, number:1,position:'P'}),
    knex('players_teams').insert({player_id:18, team_id:2, number:8,position:'M'}),
    knex('players_teams').insert({player_id:19, team_id:2, number:5,position:'D'}),
    knex('players_teams').insert({player_id:20, team_id:2, number:99,position:'DEL'}),
    knex('players_teams').insert({player_id:21, team_id:2, number:9,position:'M'}),
    knex('players_teams').insert({player_id:22, team_id:2, number:10,position:'DEL'}),

    //Team 3
    knex('players_teams').insert({player_id:23, team_id:3, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:24, team_id:3, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:25, team_id:3, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:26, team_id:3, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:27, team_id:3, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:28, team_id:3, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:29, team_id:3, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:30, team_id:3, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:31, team_id:3, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:32, team_id:3, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:33, team_id:3, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:34, team_id:3, number: 0, position: 'M' }),
    //Team 4
    knex('players_teams').insert({player_id:35, team_id:4, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:36, team_id:4, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:37, team_id:4, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:38, team_id:4, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:39, team_id:4, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:40, team_id:4, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:41, team_id:4, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:42, team_id:4, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:43, team_id:4, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:44, team_id:4, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:45, team_id:4, number: 0, position: 'M' }),
    //Team 5
    knex('players_teams').insert({player_id:46, team_id:5, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:47, team_id:5, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:48, team_id:5, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:49, team_id:5, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:50, team_id:5, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:51, team_id:5, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:52, team_id:5, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:53, team_id:5, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:54, team_id:5, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:55, team_id:5, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:56, team_id:5, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:57, team_id:5, number: 0, position: 'M' }),
    //Team 6
    knex('players_teams').insert({player_id:58, team_id:6, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:59, team_id:6, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:60, team_id:6, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:61, team_id:6, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:62, team_id:6, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:63, team_id:6, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:64, team_id:6, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:65, team_id:6, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:66, team_id:6, number: 0, position: 'M' }),
    knex('players_teams').insert({player_id:67, team_id:6, number: 0, position: 'M' }),

    knex('players_teams').where('id', '=', 23).update({number:'13',position:'D'}),
    knex('players_teams').where('id', '=', 24).update({number:'7',position:'D'}),
    knex('players_teams').where('id', '=', 25).update({number:'3',position:'P'}),
    knex('players_teams').where('id', '=', 26).update({number:'2',position:'M'}),
    knex('players_teams').where('id', '=', 27).update({number:'5',position:'P'}),
    knex('players_teams').where('id', '=', 28).update({number:'17',position:'D'}),
    knex('players_teams').where('id', '=', 29).update({number:'1',position:'M'}),
    knex('players_teams').where('id', '=', 30).update({number:'8',position:'M'}),
    knex('players_teams').where('id', '=', 31).update({number:'5',position:'DEL'}),
    knex('players_teams').where('id', '=', 32).update({number:'99',position:'D'}),
    knex('players_teams').where('id', '=', 33).update({number:'9',position:'DEL'}),
    knex('players_teams').where('id', '=', 34).update({number:'10',position:'M'}),
    knex('players_teams').where('id', '=', 35).update({number:'4',position:'D'}),
    knex('players_teams').where('id', '=', 36).update({number:'5',position:'DEL'}),
    knex('players_teams').where('id', '=', 37).update({number:'1',position:'D'}),
    knex('players_teams').where('id', '=', 38).update({number:'8',position:'M'}),
    knex('players_teams').where('id', '=', 39).update({number:'6',position:'DEL'}),
    knex('players_teams').where('id', '=', 40).update({number:'9',position:'P'}),
    knex('players_teams').where('id', '=', 41).update({number:'2',position:'D'}),
    knex('players_teams').where('id', '=', 42).update({number:'7',position:'P'}),
    knex('players_teams').where('id', '=', 43).update({number:'3',position:'DEL'}),
    knex('players_teams').where('id', '=', 44).update({number:'10',position:'M'}),
    knex('players_teams').where('id', '=', 45).update({number:'11',position:'D'}),
    knex('players_teams').where('id', '=', 46).update({number:'9',position:'D'}),
    knex('players_teams').where('id', '=', 47).update({number:'5',position:'D'}),
    knex('players_teams').where('id', '=', 48).update({number:'7',position:'P'}),
    knex('players_teams').where('id', '=', 49).update({number:'11',position:'D'}),
    knex('players_teams').where('id', '=', 50).update({number:'8',position:'M'}),
    knex('players_teams').where('id', '=', 51).update({number:'10',position:'M'}),
    knex('players_teams').where('id', '=', 52).update({number:'6',position:'M'}),
    knex('players_teams').where('id', '=', 53).update({number:'14',position:'M'}),
    knex('players_teams').where('id', '=', 54).update({number:'2',position:'DEL'}),
    knex('players_teams').where('id', '=', 55).update({number:'3',position:'DEL'}),
    knex('players_teams').where('id', '=', 56).update({number:'1',position:'DEL'}),
    knex('players_teams').where('id', '=', 57).update({number:'4',position:'M'}),
    knex('players_teams').where('id', '=', 58).update({number:'5',position:'D'}),
    knex('players_teams').where('id', '=', 59).update({number:'6',position:'M'}),
    knex('players_teams').where('id', '=', 60).update({number:'7',position:'M'}),
    knex('players_teams').where('id', '=', 61).update({number:'8',position:'DEL'}),
    knex('players_teams').where('id', '=', 62).update({number:'10',position:'DEL'}),
    knex('players_teams').where('id', '=', 63).update({number:'1',position:'P'}),
    knex('players_teams').where('id', '=', 64).update({number:'9',position:'M'}),
    knex('players_teams').where('id', '=', 65).update({number:'11',position:'M'}),
    knex('players_teams').where('id', '=', 66).update({number:'2',position:'D'}),
    knex('players_teams').where('id', '=', 67).update({number:'3',position:'H'})

  );
};


console.log('0023 OK')



console.log(__filename.slice(__dirname.length + 1) + ' OK')