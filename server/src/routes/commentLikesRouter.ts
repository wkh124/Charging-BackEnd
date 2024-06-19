// reactionRouter.ts

import express, { Request, Response } from 'express';
import { ensureAuthenticated } from '../middleware/authUser';
import  commentReactionDao from '../DAO/commentReactionDao'; 

const reactionRouter = express.Router();

// 사용자의 인증된 정보를 표현하는 인터페이스
interface AuthenticatedRequest extends Request {
    user?: {
        user_id: string;
    };
}

// POST route to handle inserting/updating reaction
reactionRouter.post('/cars/:carId/reviews/:reviewId/review-likes', ensureAuthenticated, async (req: Request, res: Response) => {
    const authReq = req as AuthenticatedRequest;

    if (!authReq.user) {
        return res.status(401).json({ error: '인증되지 않음' });
    }

    const user_id = authReq.user.user_id;
    const review_id = req.params.reviewId;

    try {
        await commentReactionDao.insertOrUpdateReaction(review_id, 'thumbs-up', user_id);
        res.status(201).json({ message: '반응이 성공적으로 적용되었습니다.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

// GET route to get reaction count
reactionRouter.get('/cars/:carId/reviews/:reviewId/review-likes', async (req: Request, res: Response) => {
    const review_id = req.params.reviewId;

    try {
        const count = await commentReactionDao.countActiveReactions(review_id, 'thumbs-up');
        res.status(200).json({ count });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

export default reactionRouter;


