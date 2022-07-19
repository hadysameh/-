import SaderController from "../../controllers/SaderController";
import express from "express";
import {Request,Response} from 'express'
import upload from '../../middelwares/multer'

const saderRouter = express.Router();


saderRouter.get('/onesader',SaderController.getOne)
// waredRouter.get('/waredbox',WaredController.get)
saderRouter.get('/saderbox/searchOptions',SaderController.getSearchOptions)
saderRouter.get('/saderbox/search',SaderController.getSearch)
// waredRouter.post('/waredbox/store', upload.single('mokatbaPdf'),SaderController.store)

// waredRouter.put('/waredbox/edit', upload.single('mokatbaPdf'),SaderController.update)
export default saderRouter