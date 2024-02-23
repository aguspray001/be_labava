'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RentRoomTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RentRoomTransaction.belongsTo(models.Room, {
        foreignKey: 'room_id',
        as: 'room',
        targetKey: "room_number"
      })

      RentRoomTransaction.belongsTo(models.AcceptedStatus, {
        foreignKey: 'accepted_status_id',
        as: 'acc_status'
      })

      RentRoomTransaction.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })
    }
  }
  RentRoomTransaction.init({
    room_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    rent_date: DataTypes.STRING,
    return_date: DataTypes.STRING,
    pupose: DataTypes.STRING,
    dosen_pengampu: DataTypes.STRING,
    activity: DataTypes.STRING,
    organization: DataTypes.STRING,
    accepted_status_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RentRoomTransaction',
  });
  return RentRoomTransaction;
};