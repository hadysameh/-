import seqeulize from "../db/seqeulize";
import { DataTypes } from "sequelize";
import emitSocketEvent from "../helpers/socketIo";

const Sader = seqeulize.define(
  "sader",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    doc_num: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    doc_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    egraa: {
      type: DataTypes.STRING(45),
      defaultValue: null,
      allowNull: true,
    },
    signature: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      defaultValue: null,
      allowNull: true,
    },
    subject: {
      type: DataTypes.STRING(45),
      defaultValue: null,
      allowNull: true,
    },
    attach: {
      type: DataTypes.STRING(100),
      defaultValue: null,
      allowNull: true,
    },
    register_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING(45),
      defaultValue: null,
      allowNull: true,
    },
    deadline: {
      type: DataTypes.DATEONLY,
      defaultValue: null,
      allowNull: true,
    },
    known: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    branch_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    officer_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    register_user: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    lastSader_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    lastWared_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    subBranch_id: {
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

 

export default Sader;
