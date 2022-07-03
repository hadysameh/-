import seqeulize from "../db/seqeulizer";
import { DataTypes } from "sequelize";

const Officers = seqeulize.define(
  "officers",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    mil_num: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    akdameh_num: {
      type: DataTypes.STRING(45),
      defaultValue: null,
      allowNull: true,
    },
    national_number: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(45),
      defaultValue: null,
      allowNull: true,
    },
    sub_seen: {
      type: DataTypes.STRING(1),
      defaultValue: null,
      allowNull: true,
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    arms_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    branches_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Ranks_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subbranches_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },
  },
  {
    // to make the tabel name equal the model name
    freezeTableName: true,
    timestamps: false,
  }
);
export default Officers;
