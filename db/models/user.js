'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( {Books, Bookings, Comments}) {
      this.hasMany(Books, {foreignKey: 'user_id'}),
      this.hasMany(Bookings, {foreignKey: 'user_id'}),
      this.hasMany(Comments, {foreignKey: 'user_id'})
    }
  }
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    contact: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
