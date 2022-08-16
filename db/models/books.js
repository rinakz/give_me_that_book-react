'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Bookings, Comments}) {
      this.belongsTo(User, { foreignKey: 'user_id'}),
      this.hasMany(Bookings, {foreignKey: 'books_id'}),
      this.hasMany(Comments, {foreignKey: 'books_id'})
    }
  }
  Books.init({
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    descr: DataTypes.STRING,
    image: DataTypes.STRING,
    genre: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Books',
  });
  return Books;
};
