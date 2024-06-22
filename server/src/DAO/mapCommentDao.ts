import { db_connection } from '../../config';

interface mapComment {
    id?: number;
    stat_id: string;
    user_id: string;
    nickName?: string;
    comment: string;
    created_at?: Date;
    updated_at?: Date | null;
    deleted_at?: Date | null;
}

class mapCommentDao {
    // 댓글 생성
    static async createComment(stat_id: string, user_id: string, comment: string): Promise<void> {
        await db_connection.query(
            `INSERT INTO map_comment (stat_id, user_id, comment, created_at) VALUES ($1, $2, $3, timezone('Asia/Seoul', CURRENT_TIMESTAMP))`,
            [stat_id, user_id, comment]
        );
    }

    // 특정 충전기의 댓글 가져오기 (오프셋 기반 페이지네이션)
    static async getCommentsByMapId(stat_id: string, page: number, limit: number = 10): Promise<mapComment[]> {
        const offset = (page - 1) * limit;
        const { rows } = await db_connection.query(
            `SELECT mc.id, mc.stat_id, mc.user_id, u."nickName", u.profile_pic, mc.comment, mc.created_at, mc.updated_at, mc.deleted_at
            FROM map_comment mc
            JOIN users u ON mc.user_id = u.user_id
            WHERE mc.stat_id = $1 AND mc.deleted_at IS NULL
            ORDER BY mc.created_at DESC
            LIMIT $2 OFFSET $3`,
            [stat_id, limit, offset]
        );
        return rows;
    }

    // 댓글 수정
    static async updateComment(comment_id: number, comment: string): Promise<void> {
        await db_connection.query(
            `UPDATE map_comment SET comment = $1, updated_at = timezone('Asia/Seoul', CURRENT_TIMESTAMP) WHERE id = $2 AND deleted_at IS NULL`,
            [comment, comment_id]
        );
    }

    // 댓글 삭제 (soft delete)
    static async deleteComment(comment_id: number): Promise<void> {
        await db_connection.query(
            `UPDATE map_comment SET deleted_at = timezone('Asia/Seoul', CURRENT_TIMESTAMP) WHERE id = $1`,
            [comment_id]
        );
    }
}

export default mapCommentDao;
