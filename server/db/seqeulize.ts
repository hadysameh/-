import { Sequelize } from "sequelize";
const sequelize = new Sequelize( {
    dialect: 'mysql',
    host:'localhost',
    password:'',
    database:'trc3',
    username:'root'
});
export default sequelize
