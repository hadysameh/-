import seqeulize from "../db/seqeulizer";
import { DataTypes } from "sequelize";

const Auth_Permission = seqeulize.define(
  "auth_permission",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    content_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    codename: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    // to make the tabel name equal the model name
    freezeTableName: true,
    timestamps: false,
  }
);
export default Auth_Permission;
