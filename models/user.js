"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //hasMany to product model
      user.hasMany(models.product, {
        as: "products",
        foreignKey: {
          name: "idUser",
        },
      });
      user.hasMany(models.topping, {
        as: "toppings",
        foreignKey: {
          name: "idUser",
        },
      });
      user.hasMany(models.transaction, {
        as: "transactions",
        foreignKey: {
          name: "idUser",
        },
      });
    }
  }
  user.init(
    {
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
