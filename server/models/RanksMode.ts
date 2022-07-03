import seqeulize from "../db/seqeulizer";
import { DataTypes } from "sequelize";

const Ranks = seqeulize.define(
  "ranks",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    } 
  },
  {
    // to make the tabel name equal the model name
    freezeTableName: true,
    timestamps: false,
  }
);
export default Ranks;
