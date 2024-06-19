import multer, { FileFilterCallback, DiskStorageOptions } from 'multer';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      fileValidationError?: string;
      file?: Express.Multer.File;
    }
  }
}

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    cb(null, 'uploads/');
  },
  filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
} as DiskStorageOptions);

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const fileSize = parseInt(req.headers['content-length'] || '0');
  if (file.mimetype.substring(0, 5) !== 'image') {
    req.fileValidationError = '파일 형식이 맞지 않습니다.';
    return cb(null, false);
  } else if (fileSize > 2000000) {
    req.fileValidationError = '이미지는 2MB보다 작아야합니다.';
    return cb(null, false);
  } else {
    cb(null, true);
  }
};

const multerSetup = multer({ storage: storage, fileFilter: fileFilter }).single('profilePhoto');

export default multerSetup;


