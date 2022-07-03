import seqeulize from "../db/seqeulizer";
import { DataTypes } from "sequelize";

const Auth_User_User_Permissions = seqeulize.define(
  "auth_user_user_permissions",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // to make the tabel name equal the model name
    freezeTableName: true,
    timestamps: false,
  }
);
export default Auth_User_User_Permissions;
