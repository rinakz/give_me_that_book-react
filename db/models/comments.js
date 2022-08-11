'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
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
  Comments.init({
    books_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    descr: DataTypes.STRING,
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};
