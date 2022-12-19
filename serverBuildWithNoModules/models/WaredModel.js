"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seqeulize_1 = __importDefault(require("../db/seqeulize"));
const sequelize_1 = require("sequelize");
const getCurrentYear_1 = __importDefault(require("../helpers/getCurrentYear"));
const Wared = seqeulize_1.default.define("wared", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    doc_num: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    doc_date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    taashera_elmoder: {
        type: sequelize_1.DataTypes.STRING(100),
        defaultValue: null,
        allowNull: true,
    },
    taashera_elnab: {
        type: sequelize_1.DataTypes.STRING(100),
        defaultValue: null,
        allowNull: true,
    },
    notes: {
        type: sequelize_1.DataTypes.TEXT,
        defaultValue: null,
        allowNull: true,
    },
    subject: {
        type: sequelize_1.DataTypes.STRING(100),
        defaultValue: null,
        allowNull: true,
    },
    deadline: {
        type: sequelize_1.DataTypes.DATEONLY,
        defaultValue: null,
        allowNull: true,
    },
    year: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: (0, getCurrentYear_1.default)(),
        allowNull: true,
    },
    register_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    doc_dept_num: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    attach: {
        type: sequelize_1.DataTypes.STRING(100),
        defaultValue: null,
        allowNull: true,
    },
    known: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    deliver_date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    gehaa_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    register_user: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null,
        allowNull: true,
    },
    lastSader_id: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null,
        allowNull: true,
    },
    lastWared_id: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null,
        allowNull: true,
    },
    taashera_time: {
        type: sequelize_1.DataTypes.STRING(45),
        defaultValue: null,
        allowNull: true,
    },
    docDeadline: {
        type: sequelize_1.DataTypes.DATEONLY,
        defaultValue: null,
        allowNull: true,
    },
    closedSader_id: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null,
        allowNull: true,
    },
}, {
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
});
exports.default = Wared;
