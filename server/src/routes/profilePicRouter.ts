import { Router, Request, Response, NextFunction } from 'express';
import { ensureAuthenticated } from '../middleware/authUser'; // Assuming you have this middleware
import multerSetup from '../middleware/setup-multer'; // Assuming you have multer setup middleware
import {db_connection, url} from '../../config'; // Assuming db_connection is your database connection


const router = Router();

interface AuthenticatedRequest extends Request {
    user?: {
        user_id: string;
        profile_pic:string;
    };
}
router.post("/profile-pics", ensureAuthenticated, multerSetup, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authReq = req as AuthenticatedRequest;
    const user = authReq.user;

    // Check for file validation error
    if (req.fileValidationError) {
      throw res.status(400).json({
        error: req.fileValidationError,
      });
    }

    // Check if file was uploaded
    if (!req.file) {
      throw res.status(400).json({
        error: '파일이 업로드되지 않았습니다.',
      });
    }

    if (!user) {
      return res.status(401).json({ error: '인증되지 않음' });
    }

    const profilePicUrl = `${url}/${req.file.path}`;

    const updateQuery = `
      UPDATE users 
      SET profile_pic = $1 
      WHERE user_id = $2
      RETURNING profile_pic
    `;
    const values = [profilePicUrl, user.user_id];

    const result = await db_connection.query(updateQuery, values);

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    user.profile_pic = result.rows[0].profile_pic;

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

