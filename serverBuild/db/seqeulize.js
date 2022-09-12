"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: "mysql",
    host: "localhost",
    password: "",
    database: "trc3",
    username: "root",
    logging: false,
});
exports.default = sequelize;
