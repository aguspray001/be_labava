'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.hasOne(models.RentRoomTransaction, {
        foreignKey: 'room_id',
        as: 'room',
        targetKey: "room_number"
      })
    }
  }
  Room.init({
    room_name: DataTypes.STRING,
    room_number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};