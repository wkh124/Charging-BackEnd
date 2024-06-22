import { Router, Request, Response, NextFunction } from 'express';
import { ensureAuthenticated } from '../middleware/authUser';
import {carReviewDao} from '../DAO';
import AuthenticatedRequest  from '../interfaces/authenticatedRequest';


const router = Router();

router.get('/profile/reviews',ensureAuthenticated, async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthenticatedRequest;
    
    if (!user) {
      return res.status(401).json({ error: '인증되지 않음' });
    }

    const user_id = user.user_id;

    const reviewPromise = carReviewDao.getAllreviewsByUser(user_id);
    const reactionCountPromise = carReviewDao.getAllReactionCountByUser(user_id);

    const [reviewResult, reactionCountResult] = await Promise.all([
      reviewPromise,
      reactionCountPromise,
    ]);
    console.log('Review Result:', reviewResult);
    console.log('Reaction Count Result:', reactionCountResult);


    let  reviewsWithDetails = reviewResult.map(review => {
              const reactionCount = reactionCountResult.find(count => count.comment_id === review.id)?.reaction_count || 0;

              return {
                  review_id: review.id,
                  content: review.content,
                  time: review.review_time,
                  reactionCount: reactionCount,
              };
          });      
      res.status(200).json({
          reviews: reviewsWithDetails
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});


export default router;
