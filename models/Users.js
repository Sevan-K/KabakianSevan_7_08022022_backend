// regex for password
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
// regex for name and
const pseudoRegex =
  /^\b((?!-)(?!.*--)(?!')(?!.*'')[-A-ZÀ-ÿa-z0-9. ']{2,30}(?<!-)(?<!'))$/;

("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { is: pseudoRegex },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { is: passwordRegex },
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
      bio: {
        type: DataTypes.STRING,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      // indexes: [
      //   { fields: ["email"], unique: true },
      //   { fields: ["pseudo"], unique: true },
      // ],
    }
  );
  return User;
};
