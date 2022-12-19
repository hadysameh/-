import seqeulize from "../db/seqeulize";
import { DataTypes } from "sequelize";

const Config = seqeulize.define(
  "config",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    daysBeforeExecution: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    dateOfLaunch: {
      type: DataTypes.DATEONLY,
      defaultValue: null,
      allowNull: true,
    },
  },
  {
    // to make the tabel name equal the model name
    freezeTableName: true,
    timestamps: false,
  }
);
export default Config;
