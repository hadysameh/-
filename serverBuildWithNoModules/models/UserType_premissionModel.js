"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seqeulize_1 = __importDefault(require("../db/seqeulize"));
const sequelize_1 = require("sequelize");
const UserType_premission = seqeulize_1.default.define("usertype_premission", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    userTypeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    premissionId: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null,
        allowNull: true,
    },
}, {
    /**
     *   to make the tabel name equal the model name
     */
    freezeTableName: true,
});
exports.default = UserType_premission;
