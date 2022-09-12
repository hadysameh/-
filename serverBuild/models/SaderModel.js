"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seqeulize_1 = __importDefault(require("../db/seqeulize"));
const sequelize_1 = require("sequelize");
const Sader = seqeulize_1.default.define("sader", {
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
    egraa: {
        type: sequelize_1.DataTypes.STRING(45),
        defaultValue: null,
        allowNull: true,
    },
    signature: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null,
        allowNull: true,
    },
    notes: {
        type: sequelize_1.DataTypes.TEXT,
        defaultValue: null,
        allowNull: true,
    },
    subject: {
        type: sequelize_1.DataTypes.STRING(45),
        defaultValue: null,
        allowNull: true,
    },
    attach: {
        type: sequelize_1.DataTypes.STRING(100),
        defaultValue: null,
        allowNull: true,
    },
    register_date: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        allowNull: false,
    },
    year: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null,
        allowNull: true,
    },
    type: {
        type: sequelize_1.DataTypes.STRING(45),
        defaultValue: null,
        allowNull: true,
    },
    deadline: {
        type: sequelize_1.DataTypes.DATEONLY,
        defaultValue: null,
        allowNull: true,
    },
    known: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    branch_id: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null,
        allowNull: true,
    },
    officer_id: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null,
        allowNull: true,
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
    subBranch_id: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null,
        allowNull: true,
    },
}, {
    // to make the tabel name equal the model name
    freezeTableName: true,
    timestamps: false,
});
exports.default = Sader;
