import {db_connection} from '../../config'
import { QueryResult } from 'pg';


interface carReviews{
    review_time: any;
    reaction_count: any;
    id: number;
    car_id: number;
    user_id:string;
    content:string;
}

// interface users{
//     nickName: string;
//     profilePic:string|null;
//     user_id: string;
// }

// interface ReactionCountResult {
//     reaction_count: string;
//   }


class carReviewDao{
    static async createCarReview(carId:string, userId:string, content: string): Promise<void>{
        await db_connection.query(
        'INSERT INTO car_board (car_id, user_id, content, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)',
        [ carId, userId, content ]);
    };

    static async updateCarReview(content:string, reviewId: string): Promise<void>{
        await db_connection.query(
            'UPDATE car_board SET content = $1, created_at = CURRENT_TIMESTAMP WHERE id = $2',
            [content, reviewId],
          );
        };

    static async deleteCarReview(reviewId: string): Promise<void>{
        await db_connection.query(
            'UPDATE car_board SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1',
            [reviewId],
          );
    };

    static async getAllReviewContent(carId: string): Promise<carReviews[]> {
        const { rows } = await db_connection.query(
          `SELECT 
          c.content, 
          c.id,
          COALESCE(c.updated_at, c.created_at) AS review_time,
          c.user_id
          FROM car_board c 
          WHERE c.car_id = $1 AND c.deleted_at IS NULL
          ORDER BY created_at DESC`,
          [carId]
        ); 
        return rows;
      };

      static async getAllReactionCount(carId: string): Promise<any[]> {
        const result: QueryResult = await db_connection.query(
            `SELECT 
            COUNT(i.id) AS reaction_count, 
            i.comment_id
            FROM  comment_reaction i
         JOIN
            car_board c ON i.comment_id = c.id
         WHERE 
            c.car_id = $1 AND i.deleted_at IS NULL
         GROUP BY 
            i.comment_id`,
          [carId]
        );
        return result.rows;
    };

      static async getAllAuthors(reviewId: string): Promise<any[]> {
        const result: QueryResult = await db_connection.query(
          `SELECT u."nickName", u.profile_pic, u.user_id 
           FROM "users" u 
           JOIN "car_board" c ON u.user_id = c.user_id 
           WHERE c.car_id = $1 AND c.deleted_at IS NULL`,
          [reviewId]
        );
        return result.rows;
    };

      static async getAllReactionStateFromUser(carId: string, userId: string): Promise<any[]> {
        const result: QueryResult = await db_connection.query(
          `SELECT comment_id
           FROM comment_reaction
           WHERE car_id= $1 AND user_id = $2 AND deleted_at IS NULL`,
          [carId, userId ]
        );
        return result.rows;
    };

     static async getAllreviewsByUser(userId:string): Promise<any[]> {
        const result: QueryResult = await db_connection.query(
          `SELECT 
          c.content, 
          COALESCE(c.updated_at, c.created_at) AS review_time 
          FROM car_board c 
          WHERE c.user_id = $1 AND c.deleted_at IS NULL`,
          [userId ]
        );
        return result.rows;
    };

    static async getAllReactionCountByUser(userId: string): Promise<any[]> {
        const result: QueryResult = await db_connection.query(
            `SELECT 
            COUNT(i.id) AS reaction_count, 
            i.comment_id
            FROM  comment_reaction i
         JOIN
            car_board c ON i.comment_id = c.id
         WHERE 
            c.user_id = $1 AND i.deleted_at IS NULL
         GROUP BY 
            i.comment_id`,
          [userId]
        );
        return result.rows;
    };

};

export default carReviewDao;