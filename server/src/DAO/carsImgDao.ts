import { db_connection } from '../../config';

interface CarsImg {
  id?: number;
  car_id?: number;
  img_url?: string;
  deleted_at?: Date | null;
}

class CarsImgDao {
  // 전기차 이미지 URL 데이터베이스 삽입
  // static async insertCarsImgUrl(car_id: number, img_url: string):Promise<CarsImg[]> {
  //   const { rows } = await db_connection.query(
  //     `INSERT INTO car_img (
  //       car_id,
  //       img_url,
  //       deleted_at
  //     )
  //     VALUES (
  //       $1, $2, NULL
  //     )`,
  //     [car_id, img_url]
  //   )
  //   return rows;
  // }

  // 전체 전기차 이미지 조회
  static async getCarsImg(): Promise<CarsImg[]> {
    const { rows } = await db_connection.query(
      `SELECT car_id, img_url FROM car_img ORDER BY car_id`,
    );
    return rows;
  }

  // 개별 전기차 이미지 조회
  static async getCarImg(car_id: number): Promise<CarsImg[]> {
    const { rows } = await db_connection.query(
      `SELECT car_id, img_url FROM car_img WHERE car_id = $1`,
      [car_id],
    );
    return rows;
  }
}

export default CarsImgDao;
