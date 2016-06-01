// var bookshelf = require("../config/bookshelf");
// var subdiscipline = require('./subdiscipline');
// var discipline = bookshelf.Model.extend({
// 	//Model / Table  Name
//   	tableName: 'Discipline',
//     Subdiscipline: function() {
//        return this.hasMany(Subdiscipline, 'disciplineId');
//     }

/*

zadmin Password :: 2EygOK5LqRLO66nx
MySQL Root Password :: sHrgxOVxAKfbdJSN
MySQL Postfix Password : o7fPogL8jXLnsyhe
Ip Address :: 52.40.44.107
Panel Domain :: zpanel.vacationerideas.com

*/
// });

/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './discipline'], function (DB) {

    var Subdiscipline = DB.Model.extend({
        tableName: 'subdisciplines',
        hasTimestamps: true,

        // relations
        discipline: function(){
            return this.belongsTo('Discipline');
        },
        event: function(){
            return this.hasMany('Event');
        }
    });

    // uses Registry plugin
    return DB.model('Subdiscipline', Subdiscipline);
});