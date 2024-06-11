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

class UserDao {
    //유저 찾기
    static async findUserByEmailAndPlatform(email: string, platform: string): Promise<User[]> {
        const [rows] = await db_connection.query('SELECT * FROM users WHERE platform_type = ? AND email = ?', [
            platform,
            email,
        ]);
        return rows as User[];
    }
    // 유저 생성
    static async createUser(uuid: string, email: string, platform: string, displayName: string, nickName: string): Promise<void> {
        await db_connection.query(
            `INSERT INTO users (user_id, platform_type, email, displayName, nickName, verified_email, created_at, updated_at, deleted_at)
            VALUES (?, ?, ?, ?, ?, 0, CURRENT_TIMESTAMP, NULL, NULL)`,
            [uuid, platform, email, displayName, nickName]
        );
    }

    // 유저업데이트
    static async updateUser(userId: string, displayName: string, nickName: string): Promise<void> {
        await db_connection.query(
            `UPDATE users SET displayName = ?, nickName = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?`,
            [displayName, nickName, userId]
        );
    }
}

export default UserDao;
