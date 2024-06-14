import express, { Request, Response, NextFunction } from 'express';
import { ensureAuthenticated } from '../middleware/authUser';
import { db_connection } from '../../config';
// import { RowDataPacket, FieldPacket } from 'mysql2';
import { QueryResult } from 'pg';

const router = express.Router();

// 사용자의 인증된 정보를 표현하는 인터페이스
interface AuthenticatedUser {
    user_id: string;
    displayName: string;
    nickName: string;
    email: string;
    platform_type: string;
    verified_email: number;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
  }
  
  // Request 인터페이스를 확장하여 인증된 사용자 정보를 포함하는 인터페이스 정의
  interface AuthenticatedRequest extends Request {
    user?: AuthenticatedUser;
  }

// 리뷰 생성 라우트
router.post('/cars/:carId/reviews', ensureAuthenticated, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthenticatedRequest;
        const user = authReq.user;
      
        // 사용자가 인증되지 않은 경우 401 오류 반환
        if (!user) {
          return res.status(401).json({ error: '인증되지 않음' });
        }
      
      const content = req.body.content;
      const carId=req.params.carId;

      const userId = user.user_id;

      const params = [ carId, userId, content ];
      await db_connection.query('INSERT INTO car_board (car_id, user_id, content, created_at ) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)', params);
  
      res.status(201).json({ message: '게시글이 성공적으로 작성되었습니다.' });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

//리뷰 가져오는 라우터
router.get('/cars/:carId/reviews/:reviewId', async (req: Request, res: Response) => {
    try {
        const reviewId = req.params.reviewId;
        const { rows } = await db_connection.query('SELECT content FROM car_board WHERE id=$1', [reviewId]);
        const author= await db_connection.query('SELECT nickname FROM "users" LEFT JOIN "car_board" ON "users".user_id="car_board".user_id WHERE "car_board".id = $1', [reviewId])

        if (Number(rows.length) === 0) {
            return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
        }

        res.status(201).json({ message: '게시글을 성공적으로 가져왔습니다.', content: rows, author:author });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//한 차량에 대한 모든 리뷰 가져오는 라우터
router.get('/cars/:carId/reviews', async (req: Request, res: Response) => {
    try {
      const carId = req.params.carId;
  
      const reviewResult : QueryResult = await db_connection.query(
        'SELECT content FROM car_board WHERE car_id = $1',
        [carId]
      );
      const authorResult: QueryResult = await db_connection.query(
        'SELECT nickname FROM "users" JOIN "car_board" ON "users".user_id = "car_board".user_id WHERE "car_board".car_id = $1',
        [carId]
      );
  
      if (reviewResult.rows.length === 0) {
        return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
      }
  
      const reviewsWithUsers = reviewResult.rows.map((review, index) => ({
        content: review.content,
        author: authorResult.rows[index]?.nickname || 'Unknown'
      }));
  
      res.status(200).json({
        message: '게시글을 성공적으로 가져왔습니다.',
        reviews: reviewsWithUsers
      });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


// 게시글 수정 라우터
router.put('/cars/:carId/reviews/:reviewId',ensureAuthenticated, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthenticatedRequest;
        const user = authReq.user;
      
        // 사용자가 인증되지 않은 경우 401 오류 반환
        if (!user) {
          return res.status(401).json({ error: '인증되지 않음' });
        }

        const reviewId = req.params.reviewId;    
        // const userId = req.user.id;

        // const [rows]: [RowDataPacket[], FieldPacket[]] = await db_connection.query(
        //     'SELECT user_id FROM car_board WHERE id = ?',
        //     [reviewId]
        //   );
      
        //   if (rows.length === 0 || rows[0].user_id !== userId) {
        //     return res.status(404).json({ message: '게시글을 찾을 수 없거나 권한이 없습니다.' });
        //   }

         const { content } = req.body;

        await db_connection.query(
          'UPDATE car_board SET content = $1, created_at = CURRENT_TIMESTAMP WHERE id = $2',
          [content, reviewId],
        );

        res.status(200).json({ message: '게시글이 성공적으로 수정되었습니다.' });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// 게시글 삭제 라우터
router.delete('/cars/:carId/reviews/:reviewId', ensureAuthenticated, async (req: Request, res: Response) => {
    try {

        const authReq = req as AuthenticatedRequest;
        const user = authReq.user;
      
        // 사용자가 인증되지 않은 경우 401 오류 반환
        if (!user) {
          return res.status(401).json({ error: '인증되지 않음' });
        }

        const reviewId = req.params.reviewId;        

        await db_connection.query(
          'UPDATE car_board SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1',
          [reviewId],
        );

        res.status(200).json({ message: '게시글이 성공적으로 삭제되었습니다.' });
    } catch (error) {

        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});





export default router;