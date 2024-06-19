import { db_connection } from '../../config';

interface CarReview {
  car_id: string;
  user_id: string;
  content: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

interface User {
  user_id: string;
  nickName: string;
}

class carReviewDao {
  static async createReview(carId: string, userId: string, content: string): Promise<void> {
    await db_connection.query(
      'INSERT INTO car_board (car_id, user_id, content, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)',
      [carId, userId, content]
    );
  }

  static async getReviewContent(reviewId: string): Promise<CarReview[]> {
    const { rows } = await db_connection.query(
      'SELECT content FROM car_board WHERE id = $1 AND deleted_at IS NULL',
      [reviewId]
    );
    return rows;
  }

  static async getReviewAuthor(reviewId: string): Promise<User[]> {
    const { rows } = await db_connection.query(
      'SELECT "nickName" FROM "users" LEFT JOIN "car_board" ON "users".user_id = "car_board".user_id WHERE "car_board".id = $1 AND "car_board".deleted_at IS NULL',
      [reviewId]
    );
    return rows;
  }

  static async getReviewsByCarId(carId: string): Promise<CarReview[]> {
    const { rows } = await db_connection.query(
      'SELECT content FROM car_board WHERE car_id = $1 AND deleted_at IS NULL',
      [carId]
    );
    return rows;
  }

  static async getAuthorsByCarId(carId: string): Promise<User[]> {
    const { rows } = await db_connection.query(
      'SELECT "nickName" FROM "users" JOIN "car_board" ON "users".user_id = "car_board".user_id WHERE "car_board".car_id = $1 AND "car_board".deleted_at IS NULL',
      [carId]
    );
    return rows;
  }

  static async updateReviewContent(reviewId: string, content: string): Promise<void> {
    await db_connection.query(
      'UPDATE car_board SET content = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND deleted_at IS NULL',
      [content, reviewId]
    );
  }

  static async deleteReview(reviewId: string): Promise<void> {
    await db_connection.query(
      'UPDATE car_board SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1 AND deleted_at IS NULL',
      [reviewId]
    );
  }
}

export default carReviewDao;
