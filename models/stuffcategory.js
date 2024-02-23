'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StuffCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StuffCategory.hasOne(models.Stuff, {
        foreignKey: "category_id",
        as: "category_id",
        targetKey: "category_number"
      })
    }
  }
  StuffCategory.init({
    name: DataTypes.STRING,
    total: DataTypes.INTEGER,
    category_number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StuffCategory',
  });
  return StuffCategory;
};