"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getCurrentYear = () => {
    const todaysDate = new Date().toISOString().slice(0, 19).replace(/T.*/, "");
    const currentYear = todaysDate.split("-")[0];
    return currentYear;
};
exports.default = getCurrentYear;
