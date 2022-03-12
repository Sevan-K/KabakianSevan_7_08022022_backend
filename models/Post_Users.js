("use strict");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post_User extends Model {
    static associate(models) {}
  }
  Post_User.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: { model: "Posts", key: "id" },
        onDelete: "CASCADE",
      },
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
      },
    },
    { sequelize, modelName: "Post_User" }
  );
  return Post_User;
};
