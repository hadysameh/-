"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: "mysql",
    host: "localhost",
    // password: "Test@123",
    password: "",
    database: "trc3",
    username: "root",
    logging: false,
});
exports.default = sequelize;
