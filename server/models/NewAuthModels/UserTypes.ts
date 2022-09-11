import seqeulize from "../../db/seqeulize";
import { DataTypes } from "sequelize";

const UserType = seqeulize.define(
  "usertypes",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
export default UserType;
