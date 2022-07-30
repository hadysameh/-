import WaredController from "../../controllers/WaredController";
import express from "express";
import {Request,Response} from 'express'
import {waredUpload} from '../../middelwares/multer'

const waredRouter = express.Router();

// router.post('/post',(req:Request,res:Response)=>{
//     console.log(req)
//     res.json('testing is done')

// })
waredRouter.get('/wared',WaredController.getOne)
// waredRouter.get('/waredbox',WaredController.get)
waredRouter.get('/waredbox/searchOptions',WaredController.getSearchOptions)
waredRouter.get('/waredbox/search',WaredController.getSearch)
waredRouter.post('/waredbox/store', waredUpload.single('mokatbaPdf'),WaredController.store)

waredRouter.put('/waredbox/edit', waredUpload.single('mokatbaPdf'),WaredController.update)
export default waredRouter