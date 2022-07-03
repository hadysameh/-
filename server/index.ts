//{ Express }  is the type
import express,{ Express,Request,Response } from "express";
// import { route } from './routes/controllers-routes/waredRoutes'

// import mongoose   from "mongoose";
// import {Post} from './models/post'
import cors from "cors"
// import bodyparser from "body-parser"
// import router from './routes/posts'
// import router from './routes/categories'
import {routesAssigner} from './routes/index'
import seqeulize from './db/seqeulizer'
import Wared from './models/WaredModel'
require('dotenv').config();

seqeulize.sync().then((res) => {/*console.log(res)*/});

Wared.findOne({ where: { id: 53469 } }).then((res)=>{
    console.log({res})
})
const app:Express = express()
app.use(cors())
app.use(express.urlencoded())
app.use(express.json());
// app.use(router)
routesAssigner(app)
app.get('/',(req:Request,res:Response)=>{
    res.json('hello from TS')
})
// console.log(Post)
// console.log(typeof(process.env.PORT))
let port:string = process.env.PORT as string
app.listen(port,()=>{
    console.log('app runs on '+port)
})
// mongoose.connect(process.env.mongoose_connection_string as string).then(()=>{
//     console.log('mongodb connected')
// })
