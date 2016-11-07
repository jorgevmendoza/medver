/**
 * Created by george on 16/02/2016.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./base_model', './category', './group', './phase', './team', './status_type'], function (DB) {

    var Category_group_phase_team = DB.Model.extend({
        tableName: 'categories_groups_phases_teams',
        hasTimestamps: true,

        team: function(){
            return this.belongsTo('Team', 'team_id');
        },

        category: function(){
            return this.belongsTo('Category', 'category_id');
        },

        group: function(){
            return this.belongsTo('Group', 'group_id');
        },

        phase: function(){
            return this.belongsTo('Phase', 'phase_id');
        },

        status_type: function(){
            return this.belongsTo('Status_type', 'status_id');
        }

    });

    // uses Registry plugin
    return DB.model('Category_group_phase_team', Category_group_phase_team);
});
