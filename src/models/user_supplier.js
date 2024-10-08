'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_Supplier.init({
    supplierName: DataTypes.STRING,
    addressSupplier: DataTypes.STRING,
    activeStatus: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User_Supplier',
  });
  return User_Supplier;
};