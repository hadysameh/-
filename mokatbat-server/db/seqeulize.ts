import { Sequelize } from "sequelize";
const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  // password: "Test@123",
  password: "",
  database: "trc3",
  username: "root",
  logging: false,
});
export default sequelize;
