/**
 * Created by George on 17/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
	'./util',
    './discipline',
    './subdiscipline',
    './user',
    './competition',
    './season'
    // './category',
    // './gender'
], function (Util, Discipline, Subdiscipline, User, Competition, Season) {
    //, Category, Gender

    return {
    	util : Util,
    	user: User,
    	discipline: Discipline,
        subdiscipline: Subdiscipline,
        competition: Competition,
        season: Season
        // category: Category,
        // gender: Gender
    };
});