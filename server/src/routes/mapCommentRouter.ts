import express, { Request, Response } from 'express';
import{ mapCommentDao } from '../DAO';
import { ensureAuthenticated } from '../middleware/authUser';

const mapCommentRouter = express.Router();

interface AuthenticatedRequest extends Request {
    user?: {
        user_id: string;
    };
}

mapCommentRouter.post('/map-comments', ensureAuthenticated, async (req: Request, res: Response) => {
    const authReq = req as AuthenticatedRequest;
    const { charger_id, comment } = req.body;

    if (!authReq.user) {
        return res.status(401).json({ error: '인증되지 않음' });
    }

    const user_id = authReq.user.user_id;

    try {
        await mapCommentDao.createComment(charger_id, user_id, comment);
        res.status(201).json({ message: '댓글이 성공적으로 생성되었습니다.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

mapCommentRouter.get('/map-comments/:charger_id', async (req: Request, res: Response) => {
    const { charger_id } = req.params;

    try {
        const comments = await mapCommentDao.getCommentsByChargerId(charger_id);
        res.status(200).json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

// 수정 삭제 추가


export default mapCommentRouter;
