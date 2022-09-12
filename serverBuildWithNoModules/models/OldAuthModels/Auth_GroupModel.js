"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seqeulize_1 = __importDefault(require("../../db/seqeulize"));
const sequelize_1 = require("sequelize");
const Auth_Group = seqeulize_1.default.define("auth_group", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(80),
        allowNull: false,
    },
}, {
    // to make the tabel name equal the model name
    freezeTableName: true,
    timestamps: false,
});
exports.default = Auth_Group;
