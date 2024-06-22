import { Router, Request, Response, NextFunction } from 'express';
import { ensureAuthenticated } from '../middleware/authUser'; // Assuming you have this middleware
import  AuthenticatedRequest  from '../interfaces/authenticatedRequest';
import { userDao } from '../DAO';

const router = Router();

// router.post("/profile-pics", ensureAuthenticated, multerSetup, async (req: Request, res: Response, next: NextFunction)  => {
//     try {
//     const { user } = req as AuthenticatedRequest;

//     if (!req.file) {
//       throw res.status(400).json({
//         error: '파일이 업로드되지 않았습니다.',
//       });
//     }

//     if (!user) {
//       return res.status(401).json({ error: '인증되지 않음' });
//     }

//     const profilePicUrl = `${url}/${req.file.path}`;

//     const result =await userDao.userProfilePic(profilePicUrl, user.user_id); 

//     if (result.length === 0) {
//       return res.status(404).json({
//         error: 'User not found',
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       image: req.file.path,
//       fileName: req.file.filename,
//     });

//   } catch (error) {
//     return next(error);
//   }
// });


// Connecting to google cloud storage
import { Storage } from "@google-cloud/storage";
import path from "path";

const storage = new Storage({
  projectId: "impactful-post-403213",
  keyFilename: path.resolve(__dirname, "./", "service-account.json"),
});


// Selecting a bucket from storage
const bucket = storage.bucket("gcpforelice");

// Multer Config
import multer from "multer";
import GcsEngine, { CustomFileResult }  from "../config/GcsEngine";

const nameFn = (_req: Request, file: Express.Multer.File) => {
  const fileExt = path.extname(file.originalname);

  // Do not forget to append file's extension
  return `${file.originalname}~${new Date().getSeconds()}${fileExt}`;
};

const gcStorageWithoutValidator = GcsEngine({
  bucket: bucket,
  nameFn: nameFn,
});

const upload = multer({
  storage: gcStorageWithoutValidator,
}).single("profilePhoto");

// Example route
router.post("/profile-pics",ensureAuthenticated, upload, async(req: Request, res: Response, next:NextFunction) => {
  try {
    const { user } = req as AuthenticatedRequest;
  
    if (!req.file) {
      throw res.status(400).json({
        error: '파일이 업로드되지 않았습니다.',
      });
    }

    if (!user) {
      return res.status(401).json({ error: '인증되지 않음' });
    }
    console.log(req.file);
    const fileResult = req.file as CustomFileResult;
    console.log(fileResult);
    const profilePicUrl = `https://storage.cloud.google.com/gcpforelice/${(req.file as CustomFileResult).name}`;

    const result =await userDao.userProfilePic(profilePicUrl, user.user_id); 

    if (result.length === 0) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      image: req.file.path,
      fileName: req.file.filename,
    });

  } catch (error) {
    return next(error);
  }
});

// router.post("/profile-pics", ensureAuthenticated, multerSetup, async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { user } = req as AuthenticatedRequest;

//     if (!req.file) {
//       throw res.status(400).json({
//         error: '파일이 업로드되지 않았습니다.',
//       });
//     }

//     if (!user) {
//       return res.status(401).json({ error: '인증되지 않음' });
//     }

//     const profilePicUrl = `${url}/${req.file.path}`;

//     const result =await userDao.userProfilePic(profilePicUrl, user.user_id); 

//     if (result.length === 0) {
//       return res.status(404).json({
//         error: 'User not found',
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       image: req.file.path,
//       fileName: req.file.filename,
//     });

//   } catch (error) {
//     return next(error);
//   }
// });

export default router;


