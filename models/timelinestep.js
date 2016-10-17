'use strict';
module.exports = function(sequelize, DataTypes) {
  var timelinestep = sequelize.define('timelinestep', {
    timeline_id: DataTypes.INTEGER,
    step_name: DataTypes.STRING,
    step_description: DataTypes.TEXT,
    step_position: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        //models.timelinestep.belongsTo(models.timeline);
      }
    }
  });
  return timelinestep;
};