'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AcceptedStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AcceptedStatus.belongsTo(models.RentRoomTransaction, {
        foreignKey: 'accepted_status_id',
        as: 'rent_room_transaction'
      })
    }
  }
  AcceptedStatus.init({
    status_name: DataTypes.STRING,
    status_number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AcceptedStatus',
  });
  return AcceptedStatus;
};