import seqeulize from "../../../db/seqeulize";
import { DataTypes } from "sequelize";

const Branches = seqeulize.define(
  "branches",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(45),
      defaultValue: null,
      allowNull: true,
    },
    // this is a forign key refrencing the users tabel
    manager_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
  },
  {
    // to make the tabel name equal the model name
    freezeTableName: true,
    timestamps: false,
  }
);
export default Branches;
