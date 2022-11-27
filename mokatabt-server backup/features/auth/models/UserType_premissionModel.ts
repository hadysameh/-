import seqeulize from "../../../db";
import { DataTypes } from "sequelize";

const UserType_premission = seqeulize.define(
  "usertype_premission",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    premissionId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
  },
  {
    /**
     *   to make the tabel name equal the model name
     */
    freezeTableName: true,
  }
);
export default UserType_premission;
