"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seqeulize_1 = __importDefault(require("../db/seqeulize"));
const sequelize_1 = require("sequelize");
const WaredTrackingOfficers = seqeulize_1.default.define("waredtrackingofficers", {
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
    officer_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    opened: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
    },
    openedDate: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: null,
        allowNull: true,
    },
}, {
    // to make the tabel name equal the model name
    freezeTableName: true,
    timestamps: false,
});
WaredTrackingOfficers.afterCreate(() => {
});
WaredTrackingOfficers.afterUpdate(() => {
});
WaredTrackingOfficers.afterDestroy(() => {
});
exports.default = WaredTrackingOfficers;
