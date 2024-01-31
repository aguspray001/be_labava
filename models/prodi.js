'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prodi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Prodi.hasOne(models.User, {
        foreignKey: "prodi_id",
        as: "user"
      })
    }
  }
  Prodi.init({
    prodi_name: DataTypes.STRING,
    prodi_number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Prodi',
  });
  return Prodi;
};