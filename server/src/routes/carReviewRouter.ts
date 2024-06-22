import express, { Request, Response, NextFunction } from 'express';
import { ensureAuthenticated } from '../middleware/authUser';
import { carReviewDao } from '../DAO';
import  AuthenticatedRequest  from '../interfaces/authenticatedRequest';

const router = express.Router();


// 리뷰 생성 라우트
router.post('/cars/:carId/reviews', ensureAuthenticated, async (req: Request, res: Response) => {
    try {
      const { user } = req as AuthenticatedRequest;
      
        if (!user) {
          return res.status(401).json({ error: '인증되지 않음' });
        }
      const carId=req.params.carId;   
      const userId = user.user_id;  
      const content = req.body.content;

      await carReviewDao.createCarReview(carId, userId, content)
  
      res.status(201).json({ message: '게시글이 성공적으로 작성되었습니다.' });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

//차량 별 리뷰 가져오는 라우터
router.get('/cars/:carId/reviews', async (req: Request, res: Response) => {
  try {
      const carId = req.params.carId;
      const { user } = req as AuthenticatedRequest;

      const reviewPromise = carReviewDao.getAllReviewContent(carId);
      const reactionCountPromise = carReviewDao.getAllReactionCount(carId);
      const authorPromise = carReviewDao.getAllAuthors(carId);
  
      const [reviewResult, reactionCountResult, authorResult] = await Promise.all([
        reviewPromise,
        reactionCountPromise,
        authorPromise
      ]);

      let reviewsWithDetails;

      if (user) {
          const reactionResult = await carReviewDao.getAllReactionStateFromUser(carId, user.user_id);

          reviewsWithDetails = reviewResult.map(review => {
              const reacted = reactionResult.some(state => state.comment_id === review.id);
              const author = authorResult.find(author => author.user_id === review.user_id);
              const reactionCount = reactionCountResult.find(count => count.comment_id === review.id)?.reaction_count || 0;

              return {
                  review_id: review.id,
                  content: review.content,
                  time: review.review_time,
                  state: reacted,
                  reactionCount: reactionCount,
                  user_id: author.user_id,
                  profile_pic: author.profile_pic ,
                  author: author.nickName 
              };
          });
      } else {
          reviewsWithDetails = reviewResult.map(review => {
              const author = authorResult.find(author => author.user_id === review.user_id);
              const reactionCount = reactionCountResult.find(count => count.comment_id === review.id)?.reaction_count || 0;

              return {
                  review_id: review.id,
                  content: review.content,
                  time: review.review_time,
                  status: false,
                  reactionCount: reactionCount,
                  user_id: author.user_id,
                  profile_pic: author.profile_pic ,
                  author: author.nickName
              };
          });
      }

      res.status(200).json({
          reviews: reviewsWithDetails
      });
  } catch (error) {
      console.error('Error fetching reviews with details:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});




// 게시글 수정 라우터
router.put('/cars/:carId/reviews/:reviewId',ensureAuthenticated, async (req: Request, res: Response) => {
    try {
      const { user } = req as AuthenticatedRequest;
 
      
        if (!user) {
          return res.status(401).json({ error: '인증되지 않음' });
        }

        const reviewId = req.params.reviewId;    
        const { content } = req.body;

        await carReviewDao.updateCarReview( content, reviewId);

        res.status(200).json({ message: '게시글이 성공적으로 수정되었습니다.' });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// 게시글 삭제 라우터
router.delete('/cars/:carId/reviews/:reviewId', ensureAuthenticated, async (req: Request, res: Response) => {
    try {

       const { user } = req as AuthenticatedRequest;


        if (!user) {
          return res.status(401).json({ error: '인증되지 않음' });
        }

        const reviewId = req.params.reviewId;        

        await carReviewDao.deleteCarReview(reviewId);

        res.status(200).json({ message: '게시글이 성공적으로 삭제되었습니다.' });
    } catch (error) {

        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});





export default router;