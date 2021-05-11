module.exports = function(sequelize, DataTypes) {
    const destination = sequelize.define("destination", {
      location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Quotes: {
        type: DataTypes.STRING,
        allowNull: false
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Carriers: {
        type: DataTypes.STRING,
        allowNull: false
      },
      attractions: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
    return destination;
  };