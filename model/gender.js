/**
 * Created by george on 08/03/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model','./category_season'], function (DB) {

    var Gender = DB.Model.extend({
        tableName: 'genders',
        hasTimestamps: true,

        //relations
        // user n:m
        // organization n:m
        category_season: function(){
            return this.hasMany('Category_season');
        }
    });

    // uses Registry plugin
    return DB.model('Gender', Gender);
});