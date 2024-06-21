import { Router, Request, Response, NextFunction } from 'express';
import { ensureAuthenticated } from '../middleware/authUser'; // Assuming you have this middleware
import multerSetup from '../middleware/setup-multer'; // Assuming you have multer setup middleware
import {url} from '../../config'; // Assuming db_connection is your database connection
import  AuthenticatedRequest  from '../interfaces/authenticatedRequest';
import { userDao } from '../DAO';

const router = Router();


router.post("/profile-pics", ensureAuthenticated, multerSetup, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthenticatedRequest;

    if (req.fileValidationError) {
      throw res.status(400).json({
        error: req.fileValidationError,
      });
    }

    if (!req.file) {
      throw res.status(400).json({
        error: '파일이 업로드되지 않았습니다.',
      });
    }

    if (!user) {
      return res.status(401).json({ error: '인증되지 않음' });
    }

    const profilePicUrl = `${url}/${req.file.path}`;

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

export default router;

