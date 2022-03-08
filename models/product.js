"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product.belongsTo(models.user, {
        as: "users",
        foreignKey: {
          name: "idUser",
        },
      });

      product.hasMany(models.order, {
        as: "orders",
        foreignKey: {
          name: "idProduct",
        },
      });
    }
  }
  product.init(
    {
      tittle: DataTypes.STRING,
      price: DataTypes.INTEGER,
      image: DataTypes.STRING,
      idUser: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "product",
    }
  );
  return product;
};
