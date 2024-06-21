// commentReactionDAO.ts
import { db_connection } from '../../config';

class commentReactionDao {
    static async findReactionStatus(commentId: string, userId: string): Promise<string | null> {
        try {
            const result = await db_connection.query(
                `SELECT deleted_at FROM comment_reaction 
                 WHERE comment_id=$1 AND user_id=$2 AND deleted_at IS NULL
                 ORDER BY deleted_at DESC
                 LIMIT 1`,
                [commentId, userId]
            );
            if (result.rows.length > 0) {
                return result.rows[0].status;
            }
            return null;
        } catch (err) {
            throw err;
        }
    }

    static async insertOrUpdateReaction(commentId: string, carId:string, type: string, userId: string): Promise<void> {
        try {
            const statusResult = await commentReactionDao.findReactionStatus(commentId, userId);
            
            if (statusResult===null) {
                await db_connection.query(
                    `INSERT INTO comment_reaction (comment_id, car_id, type, user_id, created_at)
                     VALUES ($1, $2, $3, $4, NOW())`,
                    [commentId, carId, type, userId]
                );
            }else{
                await db_connection.query(
                    `UPDATE comment_reaction 
                     SET deleted_at=CURRENT_TIMESTAMP
                     WHERE comment_id = $1 AND car_id=$2 AND type= $3 AND user_id = $4`,
                    [commentId,carId, type, userId]
                );
            }
        } catch (err) {
            throw err;
        }
    }

    static async countActiveReactions(commentId: string, type: string): Promise<number> {
        try {
            const { rows } = await db_connection.query(
                `SELECT COUNT(id) FROM comment_reaction WHERE comment_id=$1 AND type=$2 AND deleted_at IS NULL`,
                [commentId, type]
            );
            return parseInt(rows[0].count);
        } catch (err) {
            throw err;
        }
    }
}

export default commentReactionDao;
