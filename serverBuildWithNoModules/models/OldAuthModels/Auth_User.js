"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seqeulize_1 = __importDefault(require("../../db/seqeulize"));
const sequelize_1 = require("sequelize");
const Auth_User = seqeulize_1.default.define("auth_user", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(128),
        defaultValue: null,
        allowNull: true,
    },
    // this is a forign key refrencing the users tabel
    last_login: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: null,
        allowNull: true,
    },
    is_superuser: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false,
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(254),
        allowNull: false,
    },
    is_staff: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    is_active: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    date_joined: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    // to make the tabel name equal the model name
    freezeTableName: true,
    timestamps: false,
});
exports.default = Auth_User;
