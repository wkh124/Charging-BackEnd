import { db_connection } from '../../config';

interface mapComment {
    id?: number;
    charger_id: string;
    user_id: string;
    comment: string;
    created_at?: Date;
    deleted_at?: Date | null;
}

class mapCommentDao {
  //리뷰 생성
    static async createComment(charger_id: string, user_id: string, comment: string): Promise<void> {
        await db_connection.query(
            `INSERT INTO mapComment (charger_id, user_id, comment, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)`,
            [charger_id, user_id, comment]
        );
    }
    // 리뷰 읽기
    static async getCommentsByChargerId(charger_id: string): Promise<mapComment[]> {
        const [rows] = await db_connection.query(
            `SELECT * FROM mapComment WHERE charger_id = ? AND deleted_at IS NULL ORDER BY created_at DESC`,
            [charger_id]
        );
        return rows as mapComment[];
    }
}

export default mapCommentDao;
