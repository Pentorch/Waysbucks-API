"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      transaction.belongsTo(models.user, {
        as: "users",
        foreignKey: {
          name: "idUser",
        },
      });
      transaction.hasMany(models.order, {
        as: "orders",
        foreignKey: {
          name: "idTransaction",
        },
      });
    }
  }
  transaction.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      telephone: DataTypes.STRING,
      address: DataTypes.STRING,
      postcode: DataTypes.STRING,
      income: DataTypes.INTEGER,
      status: DataTypes.STRING,
      attachment: DataTypes.STRING,
      idUser: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "transaction",
    }
  );
  return transaction;
};
