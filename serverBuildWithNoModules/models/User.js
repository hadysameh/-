"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seqeulize_1 = __importDefault(require("../db/seqeulize"));
const sequelize_1 = require("sequelize");
const bcrypt_1 = require("../utils/bcrypt");
const User = seqeulize_1.default.define(
//tabel will be named users in the database
"users", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    userName: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(128),
        defaultValue: null,
        allowNull: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(254),
        allowNull: true,
    },
    userTypeId: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null,
        allowNull: true,
    },
    officerId: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null,
        allowNull: true,
    },
}, {
    hooks: {
        beforeCreate: (user, options) => __awaiter(void 0, void 0, void 0, function* () {
            let inputPassword = user.getDataValue("password");
            let hashedPassword = yield (0, bcrypt_1.getHashed)(inputPassword);
            user.set("password", hashedPassword);
        }),
        beforeUpdate: (user, options) => __awaiter(void 0, void 0, void 0, function* () {
            let inputPassword = user.getDataValue("password");
            let hashedPassword = yield (0, bcrypt_1.getHashed)(inputPassword);
            user.set("password", hashedPassword);
        }),
    },
    freezeTableName: true,
});
exports.default = User;
