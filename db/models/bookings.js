'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Books,}) {
      this.belongsTo(User, { foreignKey: 'user_id'}),
      this.belongsTo(Books, { foreignKey: 'user_id'})
    }
  }
  Bookings.init({
    books_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    returndate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Bookings',
  });
  return Bookings;
};
