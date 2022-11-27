import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import {Branches} from "../features/branches";
import {Gehaa} from "../features/gehaa";
import {Officer} from "../features/officers";
import {Sader_Gehaa,Sader,Sadertrackingofficers} from "../features/sader";
import {Wared,Wared_Branches,Wared_Officers,WaredTrackingOfficers} from "../features/wared";
import {UserType,User,UserType_premission} from "../features/auth";
import {Premission} from "../features/premissions";
import {Arms} from "../features/arms";
import {Ranks} from "../features/ranks";
import sequelize from "../db";
import bcrypt from "bcrypt";

let router, adminJs;

/**
 * this will return array of { label:  string, value: string},
 * the value is the row id
 * CAUTION it will fetch all records from the database
 * @param {Modle} model
 */

AdminJS.registerAdapter(AdminJSSequelize);
const userParent = {
  name: "User Controlls",
  icon: "Accessibility",
};
adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: "/admin",
  resources: [
    {
      resource: User,
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
      resource: Branches,
      options: {
        properties: {
          name: {
            isTitle: true,
          },
        },
      },
    },
    {
      resource: Gehaa,
      options: {
        properties: {
          name: {
            isTitle: true,
          },
        },
      },
    },
    {
      resource: Officer,
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
      resource: Sader,
      options: {
        properties: {
          doc_num: {
            isTitle: true,
          },
        },
      },
    },
    Sader_Gehaa,
    Sadertrackingofficers,
    {
      resource: Wared,
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
    Wared_Branches,
    Wared_Officers,
    WaredTrackingOfficers,
    {
      resource: UserType,
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
      resource: Premission,
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
      resource: UserType_premission,
      options: {
        parent: userParent,
      },
    },
    {
      resource: Ranks,
      options: {
        parent: userParent,
      },
    },
    {
      resource: Arms,
      options: {
        parent: userParent,
      },
    },
  ],
});

router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    const user = await User.findOne({
      where: [
        {
          userName: email,
        },
      ],
      include: [{ model: UserType, include: [Premission] }, Officer],
    });
    // console.log({user})
    if (user) {
      if (user.usertype.type == "admin") {
        const matched = await bcrypt.compare(password, user.password);

        if (matched) {
          return user;
        }
      }
    }

    return false;
  },
  cookiePassword: "some-secret-password-used-to-secure-cookie",
});
export { router, adminJs };
