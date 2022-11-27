import seqeulize from "../../../db";
import { DataTypes } from "sequelize";

const Sader_Gehaa = seqeulize.define(
  "sader_gehaa",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    sader_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gehaa_id: {
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
export default Sader_Gehaa;
