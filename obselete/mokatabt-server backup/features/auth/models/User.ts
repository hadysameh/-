

import { DataTypes } from "sequelize";
import seqeulize from "../../../db";
import { getHashed, compareHashed } from "../../../helpers/bcrypt";
import { Officer } from "../../officers";
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
      references:{
        model:Officer,
        key:'id'
      }
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
