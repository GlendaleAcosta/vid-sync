'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    host: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    uuid: DataTypes.STRING,
    title: DataTypes.STRING
  }, {});
  Room.associate = function(models) {
    // associations can be defined here
  };
  return Room;
};