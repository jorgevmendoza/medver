if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['express'
		,'../model/index'
		,'../util/request_message_util'
		,'../util/knex_util'
		,'../helpers/standing_table_helper'
		,'../util/response_message_util'
		,'../node_modules/lodash/lodash.min'
		,'bluebird'
		,'../util/email_sender_util'
		,'../util/logger_util'
		,'js-combinatorics'
		,'../util/object_map_util'
		],
	function (express
		,Models
		,Message
		,Knex
		,StandingTable
		,Response
		,_
		,Promise
		,Email
		,logger
		,Combinatorics
		,ReplaceHelper
	){

	var router = express.Router();
	var send_email_from = Email(process.env.SENDER_EMAIL);

	var mapper = function(phase) {
		// console.log('Phase:', phase.attributes);
		phase.relations.groups.models.map(groupMapper);
		phaseDelete(phase.attributes.id);
	}

	var groupMapper = function(group){
		groupDelete(group);
	}

	var groupDelete = function(group){
		console.log('Group Delete');
		Knex(group.tableName)
		.where({id:group.id})
		.del().then(function(del_group){
		console.log('del_group', del_group);
		}).catch(function(error){
		console.log('del_group error:', error);
		})
	}

	var phaseDelete = function(phase){
		console.log('Phase Delete');
		//console.log('Phase id:', phase.attributes);
		Knex('phases')
		.where({id:phase}, ['id'])
		.del().then(function(del_phase){
		console.log('del_phase', del_phase);
		}).catch(function(error){
		console.log('del_phase error:', error);
		})
	}

	//Teams by Category
	router.get('/:category_id/team', (req, res) => {
		var category_id = req.params.category_id;
		return Models.category_group_phase_team
			.where({category_id:category_id, active:true})
			.fetchAll({withRelated:['team.player_team','category','group','phase','status_type']})
			.then(result => Response(res, result))
			.catch(error => Response(res, null, error));
	});

	//Feed by Category
	router.get('/:category_id/feed', (req, res) => {
		var category_id = req.params.category_id;
		return Models.feed_item.query( qb => {
			qb.limit(10)
			qb.orderBy('id', 'desc')
		})
		.fetchAll({withRelated:['entity.object']})
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error));
	});

	//List of seasons (doesn't seems to be needed) -> Returns Array of result
	router.get('/', function (req, res) {
		return Models.category
		.query(function(qb){})
		.where({active:true})
		.fetchAll({withRelated: ['gender', 'phases', 'classification']})
		.then(function (result) {
			Response(res, result)
		}).catch(function(error){
			Response(res, null, error)
		});
	});

	//Categories by Id -> Returns 1 result
	router.get('/:category_id', function (req, res) {
		var category_id = req.params.category_id;
		return Models.category
			.where({id:category_id})
			.where({active:true})
			.fetch({withRelated: ['gender','phases', 'classification']})
			.then(function (result) {
				Response(res, result)
			}).catch(function(error){
				Response(res, null, error)
			});
	});

	router.post('/', function (req, res) {
		//Model Instance
		var Category = Models.category;
		var category_post = req.body;

		console.log('category_post', category_post);
		new Category(category_post)
		.save()
		.then(function(new_category){
			Response(res, new_category)
		})
		.catch(function(error){
			Response(res, null, error)
		});
	});

	router.put('/:category_id', function(req, res, next){
		//Model Instance
		var category = new Models.category;

		//URL Request, Season Id
		var category_id = req.params.category_id;
		var category_upd = req.body;

		console.log('Req body', category_upd);

		var data = {}

		if(category_upd.name != undefined) data.name = category_upd.name
		if(category_upd.participant_minimum != undefined) data.participant_minimum = category_upd.participant_minimum
		if(category_upd.participant_maximum != undefined) data.participant_maximum = category_upd.participant_maximum
		if(category_upd.other_minimum_participant != undefined) data.other_minimum_participant = category_upd.other_minimum_participant
		if(category_upd.other_maximum_participant != undefined) data.other_maximum_participant = category_upd.other_maximum_participant
		if(category_upd.player_minimum_participant != undefined) data.player_minimum_participant = category_upd.player_minimum_participant
		if(category_upd.player_maximum_participant != undefined) data.player_maximum_participant = category_upd.player_maximum_participant
		if(category_upd.player_minimum_summoned != undefined) data.player_minimum_summoned = category_upd.player_minimum_summoned
		if(category_upd.player_maximum_summoned != undefined) data.player_maximum_summoned = category_upd.player_maximum_summoned
		if(category_upd.coach_minimum_participant != undefined) data.coach_minimum_participant = category_upd.coach_minimum_participant
		if(category_upd.coach_maximum_participant != undefined) data.coach_maximum_participant = category_upd.coach_maximum_participant
		if(category_upd.team_quantity != undefined) data.team_quantity = category_upd.team_quantity
		if(category_upd.gender_id != undefined) data.gender_id = category_upd.gender_id
		if(category_upd.season_id != undefined) data.season_id = category_upd.season_id
		if(category_upd.category_type_id != undefined) data.category_type_id = category_upd.category_type_id
		if(category_upd.classification_type_id != undefined) data.classification_type_id = category_upd.classification_type_id
		if(category_upd.inscription_init_at != undefined) data.inscription_init_at = category_upd.inscription_init_at
		if(category_upd.inscription_ends_at != undefined) data.inscription_ends_at = category_upd.inscription_ends_at
		if(category_upd.image_url != undefined) data.image_url = category_upd.image_url
		if(category_upd.is_published != undefined) data.is_published = category_upd.is_published
		if(category_upd.meta != undefined) data.meta = category_upd.meta

		Knex(category.tableName)
		.where('id','=',category_id)
		.where('active','=',1)
		.update(data, ['id'])
		.then(function(result){
			Response(res, result)
		})
		.catch(function(err){
			Response(res, null, err)
		});
	});

	//Cascade delete for Phases -> Groups
	router.delete('/:category_id', function(req, res, next){
		var category_id = req.params.category_id;

		return Models.phase
		.query(function(qb){})
		.where('category_id','=',category_id)
		.where({active:true})
		.fetchAll({withRelated:['groups']})
		.then(function(result){
			result.map(mapper);
			Response(res, result)
		})
		.catch(function(err){
			Response(res, null, err)
		});
	});

	router.get('/:category_id/standing_table', function(req, res){
		var categoryId = req.params.category_id;
		StandingTable.getStandingTableByCategory(categoryId, res)
	});

	router.get('/:category_id/summarized_standing_table', function(req, res){
		var categoryId = req.params.category_id;
		StandingTable.getSummarizedStandingTableByCategory(categoryId, res)
	});

    //==========================================================================
    // Competition by Simple Elimination
    //==========================================================================

    router.post('/:category_id/se', function(req, res){

        var category_id = req.params.category_id;
        var team_quantity = req.body.team_quantity;
        var postitionMSE = 1;
        console.log('\n=======================================================\n')
        console.log('Category by SE of category ', category_id)
        console.log('Category by SE with teams ', team_quantity)

        var phaseCount = Math.log2(team_quantity)

        for (var i = 0; i < phaseCount; i++)
        {
            //Creo una fase
            var numberOfPhase = i+1
            var name = "Fase " + numberOfPhase
            var p = {
                            name            : name,
                            position        : numberOfPhase,
                            active          : true,
                            category_id     : category_id
                        }
            //phase.participant_team = $scope.currentCategory.team_quantity/numberOfPhase
            if(phaseCount == (i+1))
            {
                //SOLO ENTRA EN LA FINAL
                p.name = "Final"
                p.participant_team = 4
                p.classified_team = 0
            }
            else if(phaseCount == (i+2))
            {
                //SOLO ENTRA EN LA SEMIFINAL
                p.name = "Semifinal"
                p.participant_team = 4
                p.classified_team = 4
            }
            else
            {
                console.log('Teams '+ team_quantity +' number of phase '+(numberOfPhase-1))
                console.log('potencia de dos ' + Math.pow(2, numberOfPhase-1))
                p.participant_team = team_quantity/(Math.pow(2, numberOfPhase-1));
                p.classified_team = p.participant_team/2
            }
            console.log('createPhase');

            var Phase = Models.phase;
            console.log('------------------------------');
            console.log(`name               :${p.name}`);
            console.log(`position           :${p.position}`);
            console.log(`category           :${p.category_id}`);
            console.log(`participant_team   :${p.participant_team}`);
            console.log(`classified_team    :${p.classified_team}`);
            console.log('------------------------------');
            new Phase(p).save().then(function(new_phase)
            {
                console.log('CREAMOS LOS GRUPOS PARA LA FASE ', new_phase.id);
                //Se crean los grupos por fase
                console.log('participant_team' + new_phase.attributes.participant_team);
                var maxGroups = new_phase.attributes.participant_team/4
                var locPhase = new_phase.attributes.position
                console.log ('postitionMSE:' + postitionMSE)
                console.log('maxGroups' + maxGroups);
                for (var j = 0; j < maxGroups; j++)
                {
                    var numberOfGroup = j+1;
                    var groupName = "Grupo " + numberOfGroup;
                    //SE CREA EL OBJETO GRUPO
                    var group_post = {
                                    name             : groupName,
                                    active           : true,
                                    phase_id         : new_phase.id,
                                    participant_team : 4,
                                    classified_team  : 2
                                }
                    //Model Instance
                    var Group = Models.group;
                    console.log('createGroup');
                    new Group(group_post).save().then(function(new_group)
                    {
                        console.log('locPhase: ' , locPhase)
                        console.log('numberOfGroup: ' , numberOfGroup)

                        console.log(`CREAMOS LOS ROUNDS PARA El GRUPO ${new_group.id}`);
                        //SE CREA UN ROUND POR GRUPO
                        var Round = Models.round;
                        var round_post = {
                            group_id : new_group.id,
                            name : "Ronda 1"
                        };

                        console.log(`------------------------------`);
                        console.log(`name:       ${round_post.name}`);
                        console.log(`start_date: ${round_post.start_date}`);
                        console.log(`end_date:   ${round_post.end_date}`);
                        console.log(`group_id:   ${round_post.group_id}`);
                        console.log(`------------------------------`);

						//TODO: eliminar los rounds
                        new Round(round_post).save().then(function(new_round)
                        {
                            console.log(`Create round successful ${new_round.id}`);
                            //SE CREAN LOS PARTIDOS DOS PARTIDOS POR ROUND QUE SON CUATRO EQUIPO MINIMO POR GRUPO
                            console.log(`Create a empty match`);
                            for (var i = 2; i > 0; i--)
                            {
                                var m = {
                                    number   : postitionMSE,
                                    round_id : new_round.id,
                                    location : "",
                                    active   : true
                                }
                                console.log(`------------------------------`);
                                console.log(`number:       ${postitionMSE}`);
                                console.log(`round_id: ${m.round_id}`);
                                console.log(`location:   ${m.location}`);
                                console.log(`------------------------------`);
                                postitionMSE++
                                new Models.match(m).save().then(function(item){

                                    console.log(`Match ${item}`);
                                    if(postitionMSE > team_quantity)
                                    {
                                        Response(res, 'Create Simple Elimination successful')
                                    }
                                }).catch(function(error){
                                    console.log(`{error Match: ${error}}`);
                                    Response(res, null, error)
                                });
                            }

                        }).catch(function(error){
                            console.log(`error Round: ${error}`);
                            Response(res, null, error)
                        });
                    }).catch(function(error){
                        console.log(`{error Group: ${error}}`);
                        Response(res, null, error)
                    });
                }
            }).catch(function(error){
                console.log(`{error Phase: ${error}}`);
                Response(res, null, error)
            });
        }
    });

	router.post('/:category_id/match', (req, res) => {
		return Models.category
			.where({id: req.params.category_id})
			.fetch({withRelated: ['phases.groups']})
			.then(result => {
				var cat = result.toJSON()

				var groupsWithTeams = []
				var teamCount = 1
				cat.phases.filter(ph => ph.position == 1)
				.map(phase => {
					phase.groups.map((group, index) => {
						var teams = []
						for (var i = 1; i <= group.participant_team; i++) {
							//genero un equipo x participant_team
							teams.push({
								phase_id: phase.id
								,group_id: group.id
								,position: i
								,name: `Team ${teamCount++}`
							})
						}
						groupsWithTeams.push(teams)
					})
				})
				return groupsWithTeams
			})
			.then(result => {
				return result.map(group => {
					//por cada grupo, voy a generar los partidos posibles
					var matches = Combinatorics.combination(group, 2)
					let match = null
					while(match = matches.next()){
						new Models.match({
							group_id: match[0].group_id
							,placeholder_home_team_group: match[0].group_id
							,placeholder_home_team_position: match[0].position
							,placeholder_visitor_team_group: match[1].group_id
							,placeholder_visitor_team_position: match[1].position
							,location: 'TBA'
						})
						.save()
						.then(r => logger.debug(r.toJSON()) )
						.catch(e => console.log(e))
					}
				})
			})
			.then(result => Response(res, result))
			.catch(error => Response(res, null, error))
	})

	router.get('/:category_id/match', (req, res) => {
		Models.category
		.where({id: req.params.category_id})
		.fetch({withRelated:
			['phases.groups.matches.home_team'
			,'phases.groups.matches.visitor_team'
		]})
		.then(result => Response(res, result) )
		.catch(error => Response(res, null, error))
	})

	//==========================================================================
	// Given a category and a team, returns the list of matches
	//==========================================================================

	router.get('/:category_id/teams/:team_id/matches', function(req, res){

		var categoryId = req.params.category_id
		var teamId = req.params.team_id

		return Models.match.query(function(qb){
				qb.innerJoin('rounds', 'rounds.id', 'matches.round_id')
				qb.innerJoin('groups', 'groups.id', 'rounds.group_id')
				qb.innerJoin('phases', 'phases.id', 'groups.phase_id')
				qb.innerJoin('categories', 'categories.id', 'phases.category_id')
				qb.where('categories.id', '=', categoryId)
				qb.where('matches.active', '=', true)
				qb.where('matches.home_team_id', '=', teamId)
				qb.orWhere('matches.visitor_team_id', '=', teamId)
			})
			.fetchAll({withRelated:['round',
				'round.group',
				'round.group.phase',
				'round.group.phase.category',
				'home_team',
				'visitor_team']})
			.then(function(result){
				Response(res, result)
			})
			.catch(function(err){
				Response(res, null, err)
			})
	})

	//==========================================================================
	// Create a category group phase team
	//==========================================================================
	router.post('/:category_id/team/:team_id/invite', function(req, res){
		req.body.category_id = req.params.category_id
		req.body.team_id = req.params.team_id
		req.body._currentUser = req._currentUser
		req.body._origin = req.headers.origin
		console.log('POST', req.body)
		saveCategoryGroupPhaseTeam(req.body, res)
	})

	//==========================================================================
	// Update a category group phase team
	//==========================================================================
	router.put('/:category_id/team/:team_id/invite/:id', function(req, res){
		req.body.category_id = req.params.category_id
		req.body.team_id = req.params.team_id
		console.log('PUT', req.body)
		saveCategoryGroupPhaseTeam(req.body, res)
	})

	router.delete('/:category_id/team/:team_id/invite/:id', function(req, res){
		var data = {}
		data.id = req.params.id
		data.category_id = req.params.category_id
		data.team_id = req.params.team_id
		data.active = false
		console.log('DELETE', data)
		saveCategoryGroupPhaseTeam(data, res)
	})

	//==========================================================================
	// Save Category Group Phase Team
	//==========================================================================
	const buildCategoryGroupPhaseTeamData = (data) => {
		let spiderData = {}
		if(data.id != undefined) spiderData.id = data.id
		if(data.category_id != undefined) spiderData.category_id = data.category_id
		if(data.team_id != undefined) spiderData.team_id = data.team_id
		if(data.status_id != undefined) spiderData.status_id = data.status_id
		if(data.phase_id != undefined) spiderData.phase_id = data.phase_id
		if(data.group_id != undefined) spiderData.group_id = data.group_id
		if(data.active != undefined) spiderData.active = data.active
		if(data.payment != undefined) spiderData.payment = data.payment
		if(data.document != undefined) spiderData.document = data.document
		if(data.roster != undefined) spiderData.roster = data.roster
		return spiderData
	}

	const saveCategoryGroupPhaseTeam = (data, res) => {
		// console.log("data: ", data)
		var _currentUser = data._currentUser
		var _origin = data._origin

		let spiderData = buildCategoryGroupPhaseTeamData(data)

		var innerData = {}
		innerData.team_id = data.team_id
		innerData.category_id = data.category_id
		innerData.next_status = data.status_id

		var prev = previous_registration_status(innerData)

		return new Models.category_group_phase_team(spiderData)
		.save()
		.then(function(new_invitation){

			var invitation = new_invitation
			//Sent mail of inscription on category
			// if(data.id == undefined){
			// 	email_sender_invitation(_currentUser, _origin, spiderData.category_id, spiderData.team_id)
			// }

			Response(res, invitation);
		})
		.catch(function(error){
			Response(res, null, error);
		});
	}

	//==========================================================================
	//---------------------- Email By Status Change tests ----------------------
	//==========================================================================

	//==========================================================================
	// Get previous team - competition - registration status
	//==========================================================================
	//
	const previous_registration_status = (data) => {
		return Models.category_group_phase_team
			.where({
				team_id: data.team_id
				,category_id: data.category_id
			})
			.fetch({withRelated:['status_type']})
			.then(function(result){
			 	return Models.status_type
				.where({id:data.next_status, active:true})
				.fetch()
			})
			.then((status_type_result) => {
				var email_template = email_status_template(status_type_result.attributes.code)
				data.template = email_template
				// var owner_email = team_owner_email(data)
				return team_owner_email(data) //true
			})
			.catch(function(err){
				console.log("Error request: ", err)
				return err
			})
	}

	//==========================================================================
	// Get previous status send Email by Status
	//==========================================================================
	const email_status_template = (status) => {
		switch (status) {
			case "pre-registration-in-progress":
				return './template/email/Alianza/register-LANG.html'
			case "pre-registration-approved":
				return './template/email/Alianza/approved-LANG.html'
			case "pre-registration-rejected":
				return './template/email/Alianza/rejected-LANG.html'
			case "pre-registration-paid":
				return './template/email/Alianza/payed-LANG.html'
			default:
				return './template/email/Alianza/register-EN.html'
		}
	}

	//==========================================================================
	// Get previous status send Email by Status
	//==========================================================================

	const send_status_email = function(data){
		// console.log("Status Email ", data.template)
		console.log("Data value for Category: ", data);
		var tag = {
			COACH_KEY: `${data.user.attributes.username}`
			,TEAM_KEY: `${data.team.attributes.name}`
			,TORNEO_KEY: `${data.category.relations.season.relations.competition.attributes.name}`
			,CATEGORIA_KEY: `${data.category.attributes.name}`
			,CIUDAD_KEY: `${JSON.parse(data.category.relations.season.attributes.meta).ciudad}`
			,IMAGE_KEY: `${data.imageUrl}`
		}

		const prefLang =  (pref) => {
			console.log("Inside PrefLang: ", pref)
			//  if (pref.valueOf() !== undefined && pref.valueOf() !== null) {
			  if (pref !== null && pref !== undefined ) {
					// 	console.log("Inside if: ", pref.toUpperCase())
				 	return pref.toUpperCase()
			 } else {
				//  console.log("Inside Else: ")
				 return "EN"
			 }
		}

		const preSubject =  (pref) => {
			//  if (pref.valueOf() !== undefined && pref.valueOf() !== null) {
				if (pref !== null && pref !== undefined ) {
					switch(pref){
						case "ES":
							return "Información de registro para Torneos Alianza de Futbol"
						default:
							return "Alianza de Futbol tournament register informaction"
					}
			 } else {
				 return "Alianza de Futbol tournament register informaction"
			 }
		}

	// console.log("User Lang: ", data.user.attributes.lang)
	//console.log("LANG", prefLang(data.user.lang))

	return template_string_replace(data.template.replace("LANG", prefLang(data.user.attributes.lang) )
				,tag ,process.env.SENDER_EMAIL
				,preSubject(data.user.attributes.lang)
				// ,'jorgevmendoza@gmail.com')
				,data.user.attributes.email)
	}

	//==========================================================================
	// Get previous status send Email by Status
	//==========================================================================

	const template_string_replace = function(file, tag, sender, subject, to){
	var fs = require('fs');
		fs.readFile(file, 'utf8', function(err, contents) {
			contents = ReplaceHelper(tag, contents)
			var send = Email(process.env.SENDER_EMAIL)
			send(to, subject, contents)
		});
	}

	//==========================================================================
	//Find current owner (User) based on team_id
	//==========================================================================
	const team_owner_email = (data) => {
		//Buscar Id entidad Team_id
		//entity_relationship -> to (id_entidad_equipo) -> relationship_Type 1 (Owner)
		//FIXME: desanidar los promises
		return Models.entity
			.where({object_id:data.team_id, active:true, object_type:'teams'})
			.fetch()
			.then(result => {
				return Models.entity_relationship
				.where({ent_ref_to_id:result.attributes.id, relationship_type_id:1, active:true})
				.fetch({withRelated:['from', 'to']})
				.then(function(innerResult){
					return Models.user
					.where({id:innerResult.relations.from.attributes.object_id})
					.fetch()
					.then(function(user_result){
						data.user = user_result
						return team_data(data)
					})
					.catch(function(user_error){
						return user_error
					})
				})
				.catch(function(InnerError){
					return InnerError
				})
			})
			.catch(function(error){
				return error
			});
	}

	//==========================================================================
	// Get Team Full Data
	//==========================================================================
	const team_data = (data) => {
		return Models.team
			.where({id:data.team_id, active:true})
			.fetch()
			.then((result) => {
				data.team = result
				return competition_data(data)
			})
			.catch((error) => {
				return {}
			})
	}

	//==========================================================================
	// Get Competition Full Data
	//==========================================================================
	const competition_data = (data) => {
		return Models.category
			.where({id:data.category_id, active:true})
			.fetch({withRelated:'season.competition'})
			.then((result) => {
				data.category = result
				// console.log("******************")
				// console.log("Competition values:", result.relations.season.relations.competition.attributes.img_url)
				// console.log("******************")
				data.imageUrl = result.relations.season.relations.competition.attributes.img_url
				//var status_email = send_status_email(data)
				return send_status_email(data)
			})
			.catch((error) => {
				return {}
			})
	}

	//==========================================================================
	// Get Season Full Data
	//==========================================================================
	// const season_data = (competition_id) => {
	// 	return Models.category
	// 		.where({id:competition_id, active:true})
	// 		.fetch()
	// 		.then((result) => {
	// 			return result
	// 		})
	// 		.catch((error) => {
	// 			return {}
	// 		})
	// }
	//==========================================================================
	// Get all players of one category and one team
	//==========================================================================
	router.get('/:category_id/team/:team_id/player', function (req, res) {

		var category_id = req.params.category_id;
		var team_id = req.params.team_id;

		return Models.category_team_player
			.where({category_id:category_id, team_id:team_id, active: true})
			.fetchAll({withRelated: [
				{'player.player_team': function(qb){
					qb.where('team_id', team_id)
				}}
				,'player.player_team.position'
			]})
			.then(result => Response(res, result))
			.catch(error => Response(res, null, error));
	});

	//==========================================================================
	// Get all players of one category
	//==========================================================================
	router.get('/:category_id/player', function (req, res) {

		var category_id = req.params.category_id;
		var team_id = req.params.team_id;

		return Models.category_team_player
			.where({category_id: category_id, active: true})
			.fetchAll({withRelated:['player']})
			.then(result => Response(res, result) )
			.catch(error => Response(res, null, error) )
	});

	//==========================================================================
	// Get the player of one category and one team
	//==========================================================================
	router.get('/:category_id/team/:team_id/player/:player_id', (req, res) => {
		var category_id = req.params.category_id;
		var team_id = req.params.team_id;
		var player_id = req.params.player_id;

		return Models.category_team_player
			.where({
				category_id:category_id
				,team_id:team_id
				,player_id:player_id
				,active:true
			})
			.fetch({withRelated:['player']})
			.then(result =>  Response(res, result))
			.catch(error =>  Response(res, null, error))
	})

	//==========================================================================
	// Create a category team player
	//==========================================================================
	router.post('/:category_id/team/:team_id/player/:player_id', function(req, res){
		console.log('params: ', req.params)
		var data = {
			params: req.params,
			body: req.body
		}
		// console.log('POST', data)
		saveCategoryTeamPlayer(data, res)
	})

	//==========================================================================
	// Update a category team player
	//==========================================================================
	router.put('/:category_id/team/:team_id/player/:player_id', function(req, res){
		var data = {
			params: req.params,
			body: req.body
		}
		// console.log('PUT', data)
		saveCategoryTeamPlayer(data, res)
	})

	//==========================================================================
	// Save Category Group Phase Team
	//==========================================================================
	var saveCategoryTeamPlayer = (data, res) => {
		console.log('saveCategoryTeamPlayer')
		logger.debug(data)
		var summonedData = {
			category_id: data.params.category_id
			,team_id: data.params.team_id
			,player_id: data.params.player_id
			,active: (data.body.active == undefined) ? true : data.body.active
			,present_in_field: (data.body.present_in_field == undefined) ? false : data.body.present_in_field
			// ,number:
			// 	data.body.number = (data.body.number == undefined) ? 0 : data.body.number
			// ,position:
			// 	data.body.position = (data.body.position == undefined) ? ""  data.body.position
		}

		if(data.body.id){
			console.log("data id: ", data.body.id)
			summonedData.id = data.body.id
		}

		return new Models.category_team_player(summonedData)
			.save()
			.then(summoned => Response(res, summoned) )
			.catch(error => Response(res, null, error) )
	}

	//==========================================================================
	// Get all Phases with the teams of one category
	//==========================================================================
	router.get('/:category_id/phase/team', (req, res) => {
		const category_id = req.params.category_id

		return Models.category_group_phase_team
			.where({category_id: category_id, active: true})
			//FIXME: la relacion category_group_phase_team es la que se esta consultando
			//por tanto, no es necesario consultarla nuevamente;
			.fetch({withRelated:[ 'category.phases.category_group_phase_team.team', 'team']})
			.then(function (result) {
				if(result){
					const x = result.toJSON().category.phases
					Response(res, x)
				}
				else{
					Response(res, [])
				}
			}).catch(function(error){
				Response(res, null, error)
			});
	});

	var sortBy = key => {
		return (a, b) => {
			if (a['position'] > b['position']) return 1
			if (a['position'] < b['position']) return -1
			return 0
		}
	}

	// dada una fase, retorna los placeholders de posiciones en referencia a la fase anterior
	// es decir, ganador grupo 1, posicion 2 grupo 3, etc
	router.get('/:category_id/team_placeholders', (req, res) => {
		//paso 0: si esta fase es la primera, devolver vacío, o simplemente el listado de equipos
		// obtener la fase, revisar el campo position
		Models.category
		.where({id: req.params.category_id})
		.fetch({withRelated: ['phases.groups']})
		.then((result) => {
			var category = result.toJSON()
			//no devuelvo nada si la cat no tiene mas de 1 fase
			if(category.phases.length < 2) Response(res, [])

			return category.phases.map((phase) => {
				//se retorna un promise por cada una de las fases
				var ph = {
					phase_id: phase.id,
					name: phase.name,
					position: phase.position,
					groups: []
				}

				phase.groups.map((group) => {
					var last = {
						group_id: group.id,
						name: group.name,
						classifying_teams: group.classified_team,
						positions: []
					}

					for (var i = 1; i <= group.classified_team; i++) {
						last.positions.push({
							position: i,
							description: `Position ${i}/${group.classified_team} of '${group.name}' on '${phase.name}'`
						})
					}
					ph.groups.push(last)
				})

				return ph
			})
		})
		.then((result) => {
			return _(result).flatten().sortBy('position')
		})
		.then((result) => {
			var tmp = undefined
			return result.map((phase) => {
				if(phase.position == 1)
					tmp = phase.groups
				else {
					var tmp2 = phase.groups
					phase.groups = tmp
					tmp = tmp2
				}
				return phase
			})
		})
		.then((result) => {
			return result.slice(1)
		})
		.then((result) => {
			Response(res, result)
		})
		.catch((error) => {
			Response(res, null, error)
		})
	})

	//==========================================================================
	// Create a request of participation of one team to a category
	//==========================================================================
	router.post('/:category_id/team/:team_id/request', (req, res) => {
		var category_id = req.params.category_id
		var team_id = req.params.team_id

		//Obtengo el id de las entidades Team y category
		var teamEntity = null
		var categoryEntity = null
		var status_id = 0

		Models.status_type
		.where({code: 'request-pending'})
		.fetch()
		.then(found => {
			status_id = found.attributes.id
			return found
		})
		.then(status => {
			Models.entity
			.query(qb => {
				qb.where({object_id: team_id,
					object_type: 'teams' })
				qb.orWhere({object_id: category_id})
				qb.where({object_type: 'categories'})
			})
			.fetchAll()
			.then((result) => {
				var tmp = result.toJSON()
				teamEntity = tmp.filter(e => e.object_type == 'teams')
				categoryEntity = tmp.filter(e => e.object_type == 'categories')
				console.log('teamEntity', teamEntity[0].id)
				console.log('categoryEntity', categoryEntity[0].id)
				//Salvamos en la tabla de request
				new Models.entity_request({
					ent_ref_from_id: categoryEntity[0].id
					,ent_ref_to_id: teamEntity[0].id
					,status_id: status_id
				}).save()
				.then((result) =>  Response(res, result))
				.catch((error) =>  Response(res, null, error))
			})
			.catch(error => Response(res, null, error))
		})
		.catch(error => Response(res, null, error))
	})

	var email_sender_invitation = function(user, origin, category_id, team_id)
	{
		var _origin = origin
		var category
		console.log('USER: ', user)
		//OBTENGO LA CATEGORIA DE LA COMPETITION
		Models.category
			.where({id:category_id, active:true})
			.fetch()
		.then(_category => {
			category = _category
			//Obtengo la entidad del team
			return Models.entity
			.where({object_id: team_id, object_type: 'teams'})
			.fetch()
		})
		.then(_teamEntity => {
				//logger.debug(_teamEntity.toJSON())
				return Models.entity_relationship
				.where({ent_ref_to_id: _teamEntity.attributes.id, relationship_type_id: 1})
				.fetchAll({withRelated: ['from.object']})
		})
		.then(_relationships => {
			realationships = _relationships.toJSON()
			for (var i = realationships.length - 1; i >= 0; i--) {
				username = realationships[i].from.object.username
				email = realationships[i].from.object.email
				var _name = category.attributes.name
				var content =  `<body style="font-family:Verdana, Arial, Helvetica, sans-serif; font-size:12px; margin:0; padding:0;"><!-- header --><table width="100%" cellpadding="0" cellspacing="0" border="0" id="background-table" align="center" class="container-table"><tr><td width="20%" align="left" ><img alt="SomoSport Logo" src="https://somosport-s3.s3.amazonaws.com/logosomosportcompleto1479494176269.png"></td><td width="60%" align="center" ></td><td width="20%" align="rigth"><img alt="Alianza" src="https://somosport-s3.s3.amazonaws.com/logoalianza1479494219199.png"></td></tr><!-- Content --><tr style="background-color:#F6F6F6; color: #000"><td width="20%" align="left" ></td><td width="60%" ><p style="font-style: italic;font-size:20px">Welcome to Somosport ${username}</p><p style="font-style: italic;font-size:20px">We will assist you to register your team at <strong>"${_name}"</strong></p><p>Thanks for signing up!</p><p style="text-align: justify;">To continue with the registration of your Team in <strong>"${_name}"</strong>, please log in at <a href="${origin}">Login</a> and pick up where you left off</p><!--p>We're always here to help, so if you have questions visit us at [url]. <p--><p>Thanks,</p><p><strong>— The Somosport Team at Alianza</strong></p></td><td  align="rigth"></td><tr style="background-color:#F6F6F6; color: #000"><td width="20%" align="left" ></td><td width="60%" ><p style="text-align: justify;">Note: This email was sent from an address that cannot accept incoming email.</p><p style="text-align: justify;">You have received this business communication as part of our efforts to fulfill your request or service your account. Please note that you may receive this and other business communications from us even if you have opted out of marketing messages as that choice does not apply to important messages that could affect your service or software, or that are required by law.</p><p style="text-align: justify;">Somosport respects your privacy. </p><p style="text-align: justify;">© Somosport Inc.,</p></td><td width="20%"  align="rigth"></td></tr></table><!-- End wrapper table --></body>`
				//var content = `<body style="font-family:Verdana, Arial, Helvetica, sans-serif; font-size:12px; margin:0; padding:0;">    <!-- header -->    <table width="100%" cellpadding="0" cellspacing="0" border="0" id="background-table" align="center" class="container-table">        <tr>            <td width="20%" align="left" >                <!-- <img alt="SomoSport Logo" src="https://somosport-s3.s3.amazonaws.com/logosomosportcompleto1479494176269.png"> -->            </td>            <td width="60%" align="center" >                <h5 style="line-height: 5px;text-align: center; font-size: 14px;">                    <img alt="SomoSport Logo"  href="${origin}" src="http://ss-management-dev.herokuapp.com/img/somosport-brand-small.png">                </h5>            </td>            <td width="20%" align="rigth">                <!-- <img alt="Alianza" src="https://somosport-s3.s3.amazonaws.com/logoalianza1479494219199.png"> -->            </td>        </tr>        <!-- Content -->        <tr style="background-color:#F6F6F6; color: #000">            <td width="20%" align="left" ><img alt="SomoSport Logo" src="https://somosport-s3.s3.amazonaws.com/logosomosportcompleto1479494176269.png"></td>            <td width="60%" >                <p style="font-style: italic;">Welcome to Somosport ${username}</p>                <p style="font-style: italic;"">We will assist you to register your team at <strong>"${_name}"</strong></p>                <p>Thanks for signing up!</p>                <p style="text-align: justify;">To continue with the registration of your Team in <strong>"${_name}"</strong>, please log in at <a href="${origin}">Login</a> and pick up where you left off</p>                <!--p>We're always here to help, so if you have questions visit us at [url]. <p-->                <p>Thanks,</p>                <p><strong>— The Somosport Team at Alianza</strong></p>            </td>            <td  align="rigth"><img alt="Alianza" src="https://somosport-s3.s3.amazonaws.com/logoalianza1479494219199.png"></td>        <tr style="background-color:#F6F6F6; color: #000">            <td width="20%" align="left" ></td>             <td width="60%" >                <p style="text-align: justify;">Note: This email was sent from an address that cannot accept incoming email.</p>                <p style="text-align: justify;">You have received this business communication as part of our efforts to fulfill your request or service your account. Please note that you may receive this and other business communications from us even if you have opted out of marketing messages as that choice does not apply to important messages that could affect your service or software, or that are required by law.</p>                <p style="text-align: justify;">Somosport respects your privacy. </p>                <p style="text-align: justify;">© Somosport Inc.</p>            </td>            <td width="20%"  align="rigth"></td>        </tr>          <tr style="background-color: #00796b;">            <td width="20%" align="left" ></td>             <td>                <h5 class="closing-text" style="color: #f6f6f6; line-height: 5px;text-align: center; font-size: 14px;">Thank you, Somosport!</h5>            </td>            <td width="20%"  align="rigth"></td>        </tr>            </table><!-- End wrapper table --></body>
				//send_email_from(email, 'Welcome to SomoSport', content )
			}
		})
		.catch(function(error){
			console.error(error)
		})
	}

	return router;

});
