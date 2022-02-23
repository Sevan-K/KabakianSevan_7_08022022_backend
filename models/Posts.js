("use strict");

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // state that a post belongs to a user
      models.Post.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        onDelete: "CASCADE",
      });
      // a User has many Post
      //   models.User.hasMany(models.Post);
    }
  }
  Post.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      content: { allowNull: false, type: DataTypes.STRING },
      //   userId: {
      //     allowNull: false,
      //     type: DataTypes.INTEGER,
      //     references: { model: "Users", key: "id"},
      //   },
      likes: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
