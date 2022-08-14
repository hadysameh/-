import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import Branches from "../models/BranchesModel";
import Gehaa from "../models/GehaaModel";
import Officers from "../models/OfficersModel";
// import Ranks from "../models/RanksMode";
import Sader_Gehaa from "../models/Sader_GehaaModel";
import Sader from "../models/SaderModel";
import Sadertrackingofficers from "../models/SadertrackingofficersModel";
import Wared from "../models/WaredModel";
import Wared_Branches from "../models/Wared_BranchesModel";
import Wared_Officers from "../models/Wared_OfficersModel";
import WaredTrackingOfficers from "../models/WaredTrackingOfficersModel";
import UserType from "../models/NewAuthModels/UserTypes";
import User from "../models/NewAuthModels/User";
import Premission from "../models/NewAuthModels/Premissions";
import UserType_premission from "../models/UserType_premissionModel";
import Arms from "../models/ArmsModel";
import Ranks from "../models/RanksMode";
import sequelize from "../db/seqeulize";
AdminJS.registerAdapter(AdminJSSequelize);
const userParent = {
  name: "User Controlls",
  icon: "Accessibility",
};
const adminJs = new AdminJS({
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
          password: {
            // isVisible: false,
          },
        },
      },
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
      resource: Officers,
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

const router = AdminJSExpress.buildRouter(adminJs);

export { router, adminJs };
