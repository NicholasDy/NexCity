// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection')

class Destination extends Model{}

Destination.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    budget:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    carrier:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    hotel:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    userID:{
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "blogpost",
  }
);

module.exports = Destination;

// module.exports = function(sequelize, DataTypes) {
//     const destination = sequelize.define("destination", {
//       location: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       Quotes: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       destination: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       Carriers: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       attractions: {
//         type: DataTypes.STRING,
//         allowNull: false
//       }
//     });
//     return destination;
//   };