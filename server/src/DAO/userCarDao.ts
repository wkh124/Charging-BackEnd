import { db_connection } from '../../config';

interface UserCar {
    id: number;
    car_id: number;
    user_id: string;
    deleted_at: Date | null;
}

class UserCarDao {
    static async getUserCar(userId: string): Promise<UserCar[]> {
        const { rows } = await db_connection.query('SELECT car_id FROM user_car WHERE user_id = $1 AND deleted_at IS NULL', [userId]);
        return rows;
    }

    // static async updateUserCar(userId: string, carId: number): Promise<void> {
    //     await db_connection.query(
    //         `UPDATE user_car SET car_id = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 AND deleted_at IS NULL`,
    //         [carId, userId]
    //     );
    // }

    static async createUserCar(userId: string, carId: number): Promise<void> {
        await db_connection.query(
            `INSERT INTO user_car (car_id, user_id, created_at) VALUES ($1, $2, timezone('Asia/Seoul', CURRENT_TIMESTAMP))`,
            [carId, userId]
        );
    }

    static async deleteUserCar(userId: string): Promise<void> {
        await db_connection.query(
            `UPDATE user_car SET  deleted_at = CURRENT_TIMESTAMP WHERE user_id = $1 AND deleted_at IS NULL`,
            [userId]
        );
    }
}

export default UserCarDao;
