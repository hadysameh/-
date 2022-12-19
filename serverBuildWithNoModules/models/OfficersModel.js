"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seqeulize_1 = __importDefault(require("../db/seqeulize"));
const sequelize_1 = require("sequelize");
const Officer = seqeulize_1.default.define("officers", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    mil_num: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null,
        allowNull: true,
    },
    akdameh_num: {
        type: sequelize_1.DataTypes.STRING(45),
        defaultValue: null,
        allowNull: true,
    },
    national_number: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null,
        allowNull: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(45),
        defaultValue: null,
        allowNull: true,
    },
    sub_seen: {
        type: sequelize_1.DataTypes.STRING(1),
        defaultValue: null,
        allowNull: true,
    },
    level: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null,
        allowNull: true,
    },
    arms_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    branches_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    Ranks_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    subbranches_id: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null,
        allowNull: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: "1",
    },
}, {
    // to make the tabel name equal the model name
    freezeTableName: true,
    timestamps: false,
});
exports.default = Officer;
