// regex for content
const regexForContent =
  /^((?!-)(?!.*--)(?!')(?!.*'')[-A-ZÀ-ÿa-z0-9!,?. ':;\(\)\^]{2,2000}(?<!-)(?<!'))$/;

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

      /*       // a post belong to many users (a post can be liked by many users)
      models.Post.belongsToMany(models.User, {
        through: models.Post_User,
        onDelete: "CASCADE",
      }); */
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
      content: {
        allowNull: false,
        type: DataTypes.STRING(2000),
        validate: { is: regexForContent },
      },
      //   userId: {
      //     allowNull: false,
      //     type: DataTypes.INTEGER,
      //     references: { model: "Users", key: "id"},
      //   },
      imageUrl: {
        type: DataTypes.STRING,
      },
      likes: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
