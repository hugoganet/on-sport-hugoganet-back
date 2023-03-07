import multer from 'multer';
const maxSize = 10 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './app/photos');
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

export const uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).array('photo');
