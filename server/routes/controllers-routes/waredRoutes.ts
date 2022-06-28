import WaredController from "../../controllers/WaredController";
import express from "express";
import {Request,Response} from 'express'

const waredRouter = express.Router();

// router.post('/post',(req:Request,res:Response)=>{
//     console.log(req)
//     res.json('testing is done')

// })
waredRouter.get('/wared/:id',WaredController.getOne)
waredRouter.get('/waredbox',WaredController.get)
waredRouter.get('/waredbox/searchOptions',WaredController.getSearchOptions)
waredRouter.get('/waredbox/search',WaredController.getSearch)

// waredRouter.get('/wared',(req:Request,res:Response)=>{
//     res.json('hello from TS')
// })

export default waredRouter