import { db_connection } from '../../config';

interface User {
    user_id: string;
    platform_type: string;
    email: string;
    displayName: string;
    nickName: string;
    verified_email: number;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
}

class userDao {
    // 유저 찾기
    static async findUser(email: string, platform: string): Promise<User[]> {
        const { rows } = await db_connection.query('SELECT * FROM users WHERE platform_type = $1 AND email = $2', [
            platform,
            email,
        ]);
        return rows;
    }

    static async findUserById(user_id: string): Promise<User | null> {
        const { rows } = await db_connection.query('SELECT * FROM users WHERE user_id = $1', [
            user_id
        ]);
        return rows.length > 0 ? rows[0] : null;
    }

    // 유저 생성
    static async createUser(uuid: string, email: string, platform: string, displayName: string, nickName: string): Promise<void> {
        await db_connection.query(
            `INSERT INTO users (user_id, platform_type, email, "displayName", "nickName", verified_email, created_at, updated_at, deleted_at)
            VALUES ($1, $2, $3, $4, $5, false, CURRENT_TIMESTAMP, NULL, NULL)`,
            [uuid, platform, email, displayName, nickName]
        );
    }

    // 유저 업데이트
    static async updateUser(userId: string, displayName: string, nickName: string): Promise<void> {
        await db_connection.query(
            `UPDATE users SET "displayName" = $1, "nickName" = $2, updated_at = CURRENT_TIMESTAMP WHERE user_id = $3`,
            [displayName, nickName, userId]
        );
    }

    // 유저 soft_delete
    static async deleteUser(userId: string): Promise<void> {
        await db_connection.query(
            `UPDATE users SET deleted_at = CURRENT_TIMESTAMP WHERE user_id = $1`,
            [userId]
        );
    }

    // deleted_at을 null로 업데이트
    static async updateDeletedAtToNull(userId: string): Promise<void> {
        await db_connection.query(
            `UPDATE users SET deleted_at = NULL WHERE user_id = $1`,
            [userId]
        );
    }
}

export default userDao;
