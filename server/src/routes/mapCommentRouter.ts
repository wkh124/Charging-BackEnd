import express, { Request, Response } from 'express';
import { mapCommentDao } from '../DAO';
import { ensureAuthenticated } from '../middleware/authUser';

const mapCommentRouter = express.Router();

interface AuthenticatedRequest extends Request {
    user?: {
        user_id: string;
    };
}

// 댓글 생성
mapCommentRouter.post('/map-comments', ensureAuthenticated, async (req: Request, res: Response) => {
    const authReq = req as AuthenticatedRequest;
    const { map_id, comment } = req.body;

    if (!authReq.user) {
        return res.status(401).json({ error: '인증되지 않음' });
    }

    const user_id = authReq.user.user_id;

    try {
        await mapCommentDao.createComment(map_id, user_id, comment);
        res.status(201).json({ message: '댓글이 성공적으로 생성되었습니다.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

// 특정 충전기의 댓글 가져오기 (오프셋 기반 페이지네이션 추가)
mapCommentRouter.get('/map-comments/:map_id', async (req: Request, res: Response) => {
    const { map_id } = req.params;
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 20;

    try {
        const comments = await mapCommentDao.getCommentsByMapId(map_id, page, limit);
        res.status(200).json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

// 댓글 수정
mapCommentRouter.put('/map-comments/:comment_id', ensureAuthenticated, async (req: Request, res: Response) => {
    const authReq = req as AuthenticatedRequest;
    const { comment } = req.body;
    const { comment_id } = req.params;

    if (!authReq.user) {
        return res.status(401).json({ error: '인증되지 않음' });
    }

    try {
        await mapCommentDao.updateComment(Number(comment_id), comment);
        res.status(200).json({ message: '댓글이 성공적으로 수정되었습니다.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

// 댓글 삭제
mapCommentRouter.delete('/map-comments/:comment_id', ensureAuthenticated, async (req: Request, res: Response) => {
    const authReq = req as AuthenticatedRequest;
    const { comment_id } = req.params;

    if (!authReq.user) {
        return res.status(401).json({ error: '인증되지 않음' });
    }

    try {
        await mapCommentDao.deleteComment(Number(comment_id));
        res.status(200).json({ message: '댓글이 성공적으로 삭제되었습니다.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

export default mapCommentRouter;
