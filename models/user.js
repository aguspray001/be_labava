'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'role'
      })

      User.belongsTo(models.Prodi, {
        foreignKey: 'prodi_id',
        as: 'prodi'
      })

      User.belongsTo(models.UserStatus, {
        foreignKey: 'status',
        as: 'status_id'
      })

      User.hasOne(models.RentRoomTransaction, {
        foreignKey: 'user_id',
        as: 'rent_room_transaction'
      })
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    nim: DataTypes.INTEGER,
    prodi_id: DataTypes.INTEGER,
    otp_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};