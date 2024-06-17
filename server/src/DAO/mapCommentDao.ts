import { db_connection } from '../../config';

interface mapComment {
    id?: number;
    map_id: string;
    user_id: string;
    comment: string;
    created_at?: Date;
    updated_at?: Date | null;
    deleted_at?: Date | null;
}

class mapCommentDao {
    // 댓글 생성
    static async createComment(map_id: string, user_id: string, comment: string): Promise<void> {
        await db_connection.query(
            `INSERT INTO map_comment (map_id, user_id, comment, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)`,
            [map_id, user_id, comment]
        );
    }

    // 특정 충전기의 댓글 가져오기
    static async getCommentsByChargerId(map_id: string): Promise<mapComment[]> {
        const { rows } = await db_connection.query(
            `SELECT * FROM map_comment WHERE map_id = $1 AND deleted_at IS NULL ORDER BY created_at DESC`,
            [map_id]
        );
        return rows;
    }

    // 댓글 수정
    static async updateComment(comment_id: number, comment: string): Promise<void> {
        await db_connection.query(
            `UPDATE map_comment SET comment = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND deleted_at IS NULL`,
            [comment, comment_id]
        );
    }

    // 댓글 삭제 (soft delete)
    static async deleteComment(comment_id: number): Promise<void> {
        await db_connection.query(
            `UPDATE map_comment SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1`,
            [comment_id]
        );
    }
}

export default mapCommentDao;
