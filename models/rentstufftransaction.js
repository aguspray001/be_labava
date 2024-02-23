'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RentStuffTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RentStuffTransaction.init({
    stuff_id: DataTypes.INTEGER,
    rent_items: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    rent_date: DataTypes.STRING,
    return_date: DataTypes.STRING,
    purpose: DataTypes.STRING,
    dosen_pengampu: DataTypes.STRING,
    activity: DataTypes.STRING,
    organization: DataTypes.STRING,
    accepted_status_id: DataTypes.INTEGER,
    rent_condition_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RentStuffTransaction',
  });
  return RentStuffTransaction;
};