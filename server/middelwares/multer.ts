// const multer  = require('multer')
import multer from 'multer'
import fs from 'fs'
import getCurrentYear from '../utils/getCurrentYear';
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      let folderPath ='./server/uploads/waredPdf/'+getCurrentYear()
       let isFolderExist = fs.existsSync(folderPath);
       if(isFolderExist){
          cb(null, folderPath );   
       }
       else{
        fs.mkdirSync(folderPath, { recursive: true })
       }
      cb(null, folderPath );
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') +file.originalname);
    }
  });
const upload = multer({/* dest: 'server/uploads/',*/storage })

export default upload