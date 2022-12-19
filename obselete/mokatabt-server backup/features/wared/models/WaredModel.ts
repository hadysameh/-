import seqeulize from "../../../db";

import { DataTypes } from "sequelize";
import getCurrentYear from "../../../helpers/getCurrentYear";
import emitSocketEvent from "../../../helpers/socketIo";
const Wared = seqeulize.define(
  "wared",
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
    taashera_elmoder: {
      type: DataTypes.STRING(100),
      defaultValue: null,
      allowNull: true,
    },
    taashera_elnab: {
      type: DataTypes.STRING(100),
      defaultValue: null,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      defaultValue: null,
      allowNull: true,
    },
    subject: {
      type: DataTypes.STRING(100),
      defaultValue: null,
      allowNull: true,
    },
    deadline: {
      type: DataTypes.DATEONLY,
      defaultValue: null,
      allowNull: true,
    },
    year: {
      type: DataTypes.INTEGER,
      defaultValue: getCurrentYear(),
      allowNull: true,
    },
    register_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    doc_dept_num: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    attach: {
      type: DataTypes.STRING(100),
      defaultValue: null,
      allowNull: true,
    },
    known: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deliver_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    gehaa_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    taashera_time: {
      type: DataTypes.STRING(45),
      defaultValue: null,
      allowNull: true,
    },
    docDeadline: {
      type: DataTypes.DATEONLY,
      defaultValue: null,
      allowNull: true,
    },
    closedSader_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
  },
  {
    // to make the tabel name equal the model name
    freezeTableName: true,
    timestamps: false,
    //for the indexes , they already exist in the db so we don't have to specify them again
    /*indexes: [
      {
        name: "PRIMARY",
        using: "BTREE",
        unique: true,
        fields: ["id", "lastSader_id", "lastWared_id", "gehaa_id", ""],
      },
      {
        name: "lastSader_id",
        using: "BTREE",
        unique: true,
        fields: ["lastSader_id"],
      },
      {
        name: "lastWared_id",
        using: "BTREE",
        unique: true,
        fields: ["lastWared_id"],
      },
      {
        name: "Wared_id_doc_num_gehaa_id_84d6eeb0_uniq",
        using: "BTREE",
        unique: true,
        fields: ["gehaa_id", "doc_num", "year"],
      },
      {
        name: "doc_dept_num_year",
        using: "BTREE",
        unique: true,
        fields: ["year", "doc_dept_num"],
      },
      {
        name: "Wared_register_user_06c4efd8_fk_auth_user_id	",
        using: "BTREE",
        unique: false,
        fields: ["register_user"],
      },
      {
        name: "closed_idx	",
        using: "BTREE",
        unique: false,
        fields: ["closedSader_id"],
      },
    ],*/
  }
);

export default Wared;
