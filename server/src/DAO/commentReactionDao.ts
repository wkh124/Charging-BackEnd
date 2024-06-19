// commentReactionDAO.ts
import { db_connection } from '../../config';

class commentReactionDao {
    static async findReactionStatus(commentId: string, userId: string): Promise<string | null> {
        try {
            const result = await db_connection.query(
                `SELECT status FROM comment_reaction 
                 WHERE comment_id=$1 AND user_id=$2
                 LIMIT 1`,
                [commentId, userId]
            );
            if (result.rows.length > 0) {
                return result.rows[0].status;
            }
            return null;
        } catch (err) {
            console.error('Error in findReactionStatus:', err);
            throw err;
        }
    }

    static async insertOrUpdateReaction(commentId: string, type: string, userId: string): Promise<void> {
        try {
            const statusResult = await commentReactionDao.findReactionStatus(commentId, userId);
            
            if (statusResult) {
                const lastStatus = statusResult;
                if (lastStatus === 'DELETED') {
                    await db_connection.query(
                        `UPDATE comment_reaction SET type =$1, status='ACTIVE', created_at=CURRENT_TIMESTAMP WHERE user_id=$2 AND comment_id=$3`,
                        [type, userId, commentId]
                    );
                    console.log('Status updated to ACTIVE');
                } else {
                    await db_connection.query(
                        `UPDATE comment_reaction SET type =$1, status='DELETED', created_at=CURRENT_TIMESTAMP WHERE user_id=$2 AND comment_id=$3`,
                        [type, userId, commentId]
                    );
                    console.log('Status updated to DELETED');
                }
            } else {
                await db_connection.query(
                    `INSERT INTO comment_reaction (comment_id, type, user_id, status, created_at)
                     VALUES ($1, $2, $3, 'ACTIVE', NOW())`,
                    [commentId, type, userId]
                );
                console.log('New status ACTIVE inserted');
            }
        } catch (err) {
            console.error('Error in insertOrUpdateReaction:', err);
            throw err;
        }
    }

    static async countActiveReactions(commentId: string, type: string): Promise<number> {
        try {
            const { rows } = await db_connection.query(
                `SELECT COUNT(*) FROM comment_reaction WHERE comment_id=$1 AND type=$2 AND status='ACTIVE'`,
                [commentId, type]
            );
            return parseInt(rows[0].count);
        } catch (err) {
            console.error('Error in countActiveReactions:', err);
            throw err;
        }
    }
}

export default commentReactionDao;
