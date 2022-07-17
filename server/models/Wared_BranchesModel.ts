import seqeulize from "../db/seqeulize";
import { DataTypes } from "sequelize";

const Wared_Branches = seqeulize.define(
  "wared_branches",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    wared_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    branches_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    egraa: {
      type: DataTypes.TEXT,
      defaultValue: null,
      allowNull: true,
    },
    egraa_doc_date: {
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
export default Wared_Branches;
