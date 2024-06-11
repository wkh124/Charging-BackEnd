import { db_connection } from '../../config';

interface UserCar {
    id: number;
    car_id: number;
    user_id: string;
    deleted_at: Date | null;
}

class UserCarDao {
    static async getUserCar(userId: string): Promise<UserCar[]> {
        const [rows] = await db_connection.query('SELECT * FROM user_car WHERE user_id = ? AND deleted_at IS NULL', [userId]);
        return rows as UserCar[];
    }

    static async updateUserCar(userId: string, carId: number): Promise<void> {
        await db_connection.query(
            `UPDATE user_car SET car_id = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ? AND deleted_at IS NULL`,
            [carId, userId]
        );
    }
}

export default UserCarDao;
