import seqeulize from "../../db/seqeulize";
import { DataTypes } from "sequelize";

const Premission = seqeulize.define("premission", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  premission: {
    type: DataTypes.STRING(80),
    allowNull: false,
  },
});
export default Premission;
