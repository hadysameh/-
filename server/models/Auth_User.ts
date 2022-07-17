import seqeulize from "../db/seqeulize";
import { DataTypes } from "sequelize";

const Auth_User = seqeulize.define(
  "auth_user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      defaultValue: null,
      allowNull: true,
    },
    // this is a forign key refrencing the users tabel
    last_login: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
    },
    is_superuser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(254),
      allowNull: false,
    },
    is_staff: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_joined: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    // to make the tabel name equal the model name
    freezeTableName: true,
    timestamps: false,
  }
);
export default Auth_User;
