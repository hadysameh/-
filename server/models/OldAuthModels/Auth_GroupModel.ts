import seqeulize from "../../db/seqeulize";
import { DataTypes } from "sequelize";

const Auth_Group = seqeulize.define(
  "auth_group",
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
  },
  {
    // to make the tabel name equal the model name
    freezeTableName: true,
    timestamps: false,
  }
);
export default Auth_Group;
