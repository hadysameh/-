import seqeulize from "../db/seqeulizer";
import { DataTypes } from "sequelize";

const Wared_Officers = seqeulize.define(
  "wared_officers",
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
    officers_id: {
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
    Wared_branch_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    note: {
      type: DataTypes.STRING(45),
      defaultValue: null,
      allowNull: true,
    },
    assigner: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    seen: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    Wared_subbranch_id: {
      type: DataTypes.INTEGER,
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
export default Wared_Officers;
