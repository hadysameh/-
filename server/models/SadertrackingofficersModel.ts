import seqeulize from "../db/seqeulize";
import { DataTypes } from "sequelize";

const Sadertrackingofficers = seqeulize.define(
  "sadertrackingofficers",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    sader_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    officer_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    opened: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    openedDate: {
      type: DataTypes.DATE,
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
export default Sadertrackingofficers;
