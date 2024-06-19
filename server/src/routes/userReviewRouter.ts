import { Router, Request, Response, NextFunction } from 'express';
import { ensureAuthenticated } from '../middleware/authUser';
import { db_connection } from '../../config';

interface AuthenticatedRequest extends Request {
    user?: {
        user_id: string;
    };
}

const router = Router();

router.get('/profile/reviews', ensureAuthenticated, async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthenticatedRequest;
    const user = authReq.user;
    
    // 사용자가 인증되지 않은 경우 401 오류 반환
    if (!user) {
      return res.status(401).json({ error: '인증되지 않음' });
    }

    const user_id = user.user_id;

    const { rows } = await db_connection.query(
      `SELECT 
          c.content, 
          (SELECT COUNT(*) FROM comment_reaction i WHERE i.comment_id = c.id AND i.status=$1) AS reaction_count 
       FROM car_board c 
       WHERE c.user_id = $2 AND c.deleted_at IS NULL`,
      ['ACTIVE', user_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
    }

    const reviews = rows.map(row => ({
      content: row.content,
      reactionCount: row.reaction_count
    }));

    res.status(200).json({ message: '게시글을 성공적으로 가져왔습니다.', reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;


