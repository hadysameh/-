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
exports.adminJs = exports.router = void 0;
const adminjs_1 = __importDefault(require("adminjs"));
const express_1 = __importDefault(require("@adminjs/express"));
const sequelize_1 = __importDefault(require("@adminjs/sequelize"));
const BranchesModel_1 = __importDefault(require("../models/BranchesModel"));
const GehaaModel_1 = __importDefault(require("../models/GehaaModel"));
const OfficersModel_1 = __importDefault(require("../models/OfficersModel"));
// import Ranks from "../models/RanksMode";
const Sader_GehaaModel_1 = __importDefault(require("../models/Sader_GehaaModel"));
const SaderModel_1 = __importDefault(require("../models/SaderModel"));
const SadertrackingofficersModel_1 = __importDefault(require("../models/SadertrackingofficersModel"));
const WaredModel_1 = __importDefault(require("../models/WaredModel"));
const Wared_BranchesModel_1 = __importDefault(require("../models/Wared_BranchesModel"));
const Wared_OfficersModel_1 = __importDefault(require("../models/Wared_OfficersModel"));
const WaredTrackingOfficersModel_1 = __importDefault(require("../models/WaredTrackingOfficersModel"));
const UserTypes_1 = __importDefault(require("../models/NewAuthModels/UserTypes"));
const User_1 = __importDefault(require("../models/NewAuthModels/User"));
const Premissions_1 = __importDefault(require("../models/NewAuthModels/Premissions"));
const UserType_premissionModel_1 = __importDefault(require("../models/UserType_premissionModel"));
const ArmsModel_1 = __importDefault(require("../models/ArmsModel"));
const RanksMode_1 = __importDefault(require("../models/RanksMode"));
const seqeulize_1 = __importDefault(require("../db/seqeulize"));
const bcrypt_1 = __importDefault(require("bcrypt"));
let router, adminJs;
exports.router = router;
exports.adminJs = adminJs;
/**
 * this will return array of { label:  string, value: string},
 * the value is the row id
 * CAUTION it will fetch all records from the database
 * @param {Modle} model
 */
adminjs_1.default.registerAdapter(sequelize_1.default);
const userParent = {
    name: "User Controlls",
    icon: "Accessibility",
};
exports.adminJs = adminJs = new adminjs_1.default({
    databases: [seqeulize_1.default],
    rootPath: "/admin",
    resources: [
        {
            resource: User_1.default,
            options: {
                parent: userParent,
                properties: {
                    userName: {
                        isTitle: true,
                    },
                },
            },
            // actions: {
            //   new: {
            //     before: async (request) => {
            //       return request
            //     },
            //   }
            // }
        },
        {
            resource: BranchesModel_1.default,
            options: {
                properties: {
                    name: {
                        isTitle: true,
                    },
                },
            },
        },
        {
            resource: GehaaModel_1.default,
            options: {
                properties: {
                    name: {
                        isTitle: true,
                    },
                },
            },
        },
        {
            resource: OfficersModel_1.default,
            options: {
                parent: userParent,
                properties: {
                    name: {
                        isTitle: true,
                    },
                    user_id: {
                        isVisible: false,
                    },
                    sub_seen: {
                        isVisible: false,
                    },
                    level: {
                        isVisible: false,
                    },
                    subbranches_id: {
                        isVisible: false,
                    },
                },
            },
        },
        {
            resource: SaderModel_1.default,
            options: {
                properties: {
                    doc_num: {
                        isTitle: true,
                    },
                },
            },
        },
        Sader_GehaaModel_1.default,
        SadertrackingofficersModel_1.default,
        {
            resource: WaredModel_1.default,
            options: {
                properties: {
                    doc_num: {
                        isTitle: true,
                    },
                    known: {
                        availableValues: [
                            { label: "مكاتبة مغلقة", value: "1" },
                            { label: "مكاتبة مفتوحة", value: "0" },
                        ],
                    },
                },
            },
        },
        Wared_BranchesModel_1.default,
        Wared_OfficersModel_1.default,
        WaredTrackingOfficersModel_1.default,
        {
            resource: UserTypes_1.default,
            options: {
                parent: userParent,
                properties: {
                    type: {
                        isTitle: true,
                    },
                },
            },
        },
        {
            resource: Premissions_1.default,
            options: {
                parent: userParent,
                properties: {
                    premission: {
                        isTitle: true,
                    },
                },
            },
        },
        {
            resource: UserType_premissionModel_1.default,
            options: {
                parent: userParent,
            },
        },
        {
            resource: RanksMode_1.default,
            options: {
                parent: userParent,
            },
        },
        {
            resource: ArmsModel_1.default,
            options: {
                parent: userParent,
            },
        },
    ],
});
exports.router = router = express_1.default.buildAuthenticatedRouter(adminJs, {
    authenticate: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.default.findOne({
            where: [
                {
                    userName: email,
                },
            ],
            include: [{ model: UserTypes_1.default, include: [Premissions_1.default] }, OfficersModel_1.default],
        });
        // console.log({user})
        if (user) {
            if (user.usertype.type == "admin") {
                const matched = yield bcrypt_1.default.compare(password, user.password);
                if (matched) {
                    return user;
                }
            }
        }
        return false;
    }),
    cookiePassword: "some-secret-password-used-to-secure-cookie",
});
