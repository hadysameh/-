"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTodaysDate = () => {
    const todaysDate = new Date().toISOString().slice(0, 19).replace(/T.*/, "");
    return todaysDate;
};
exports.default = getTodaysDate;
