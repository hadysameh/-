"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seqeulize_1 = __importDefault(require("../db/seqeulize"));
const sequelize_1 = require("sequelize");
const Wared_Branches = seqeulize_1.default.define("wared_branches", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    wared_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    branches_id: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null,
        allowNull: true,
    },
    egraa: {
        type: sequelize_1.DataTypes.TEXT,
        defaultValue: null,
        allowNull: true,
    },
    egraa_doc_date: {
        type: sequelize_1.DataTypes.DATEONLY,
        defaultValue: null,
        allowNull: true,
    },
}, {
    // to make the tabel name equal the model name
    freezeTableName: true,
    timestamps: false,
});
exports.default = Wared_Branches;
