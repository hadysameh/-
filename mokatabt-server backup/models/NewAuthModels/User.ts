import seqeulize from "../../db/seqeulize";
import { DataTypes } from "sequelize";
import { getHashed, compareHashed } from "../../utils/bcrypt";
const User = seqeulize.define(
  //tabel will be named users in the database
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(128),
      defaultValue: null,
      allowNull: true,
    },

    firstName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    userTypeId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    officerId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
  },

  {
    hooks: {
      beforeCreate: async (user, options) => {
        let inputPassword = user.getDataValue("password");
        let hashedPassword = await getHashed(inputPassword);
        user.set("password", hashedPassword);
      },
      beforeUpdate: async (user, options) => {
        let inputPassword = user.getDataValue("password");
        let hashedPassword = await getHashed(inputPassword);
        user.set("password", hashedPassword);
      },
    },
    freezeTableName: true,
  }
);

export default User;
