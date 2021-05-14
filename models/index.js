const User = require('./User');
const Destination = require('./destination');

User.hasMany(Destination, {
  foreignKey: "user_id",
  onDelete:"Cascade"
}); 

Destination.belongsTo(User, { 
  foreignKey: "user_id",
});

module.exports = { User, Destination }