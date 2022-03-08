"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class topping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      topping.belongsTo(models.user, {
        as: "users",
        foreignKey: {
          name: "idUser",
        },
      });

      topping.hasMany(models.toppingorder, {
        as: "toppingorders",
        foreignKey: {
          name: "idTopping",
        },
      });
    }
  }
  topping.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      image: DataTypes.STRING,
      idUser: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "topping",
    }
  );
  return topping;
};
