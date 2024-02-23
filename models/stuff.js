'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stuff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Stuff.belongsTo(models.StuffCategory, {
        foreignKey: 'category_id',
        as: 'category',
        targetKey: "category_number"
      })
    }
  }
  Stuff.init({
    name: DataTypes.STRING,
    buy_date: DataTypes.STRING,
    owner_id: DataTypes.INTEGER,
    current_condition: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    inventaris_code: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Stuff',
  });
  return Stuff;
};