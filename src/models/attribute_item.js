'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attribute_Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Attribute_Item.init({
    value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Attribute_Item',
  });
  return Attribute_Item;
};