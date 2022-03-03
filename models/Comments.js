("use strict");

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // state that a comment belong to one user
      models.Comment.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        onDelete: "CASCADE",
      });

      // state that a comment belong to one post
      models.Comment.belongsTo(models.Post,{
        foreignKey: {
          name: "postId",
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        onDelete: "CASCADE",
      });
    }
  }
  Comment.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      content: { allowNull: false, type: DataTypes.STRING(2000) },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
