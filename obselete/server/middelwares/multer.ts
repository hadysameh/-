// const multer  = require('multer')
import multer from "multer";
import fs from "fs";
import getCurrentYear from "../utils/getCurrentYear";
function waredDestination(req: any, file: any, cb: any) {
  let folderPath = "./uploads/waredPdf/" + getCurrentYear();
  let isFolderExist = fs.existsSync(folderPath);
  if (isFolderExist) {
    cb(null, folderPath);
  } else {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  cb(null, folderPath);
}
function saderDestination(req: any, file: any, cb: any) {
  let folderPath = "./uploads/saderPdf/" + getCurrentYear();
  let isFolderExist = fs.existsSync(folderPath);
  if (isFolderExist) {
    cb(null, folderPath);
  } else {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  cb(null, folderPath);
}
const waredStorage = multer.diskStorage({
  destination: waredDestination,
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const saderStorage = multer.diskStorage({
  destination: saderDestination,
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const waredUpload = multer({
  /* dest: '/uploads/',*/ storage: waredStorage,
});
const saderUpload = multer({
  /* dest: '/uploads/',*/ storage: saderStorage,
});

export { waredUpload, saderUpload };
