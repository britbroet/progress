'use strict';
module.exports = function(sequelize, DataTypes) {
  var timeline = sequelize.define('timeline', {
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return timeline;
};