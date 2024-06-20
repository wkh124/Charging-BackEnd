import { db_connection } from "../../config";

interface Cars {
  id: number;
  name?: string;
  brand?: string;
  model_year: number;
  fuel_efficiency: string;
  car_type: string;
  max_distance: string;
  capacity: string;
  price: number;
  deleted_at: Date | null;
}

class CarsDao {
  // 전체 전기차 조회
  static async getCars(): Promise<Cars[]> {
    const { rows } = await db_connection.query('SELECT * FROM car WHERE deleted_at IS NULL')
    return rows;
  }

  // 개별 전기차 조회
  static async getCar(id: number): Promise<Cars[] | null> {
    const { rows } = await db_connection.query('SELECT * FROM car WHERE id = $1 AND deleted_at IS NULL', [id]);
    return rows.length > 0 ? rows[0] : null
  }

  static async getCarBrandAndModel(id: number): Promise<Cars[] | null> {
    const { rows } = await db_connection.query('SELECT brand, name FROM car WHERE id = $1 AND deleted_at IS NULL', [id]);
    return rows.length > 0 ? rows[0] : null
  }

  // 개별 전기차 조회
  static async getCarIdByName(name: string): Promise<number | null> {
    const  { rows } = await db_connection.query('SELECT id FROM car WHERE name = $1 AND deleted_at IS NULL', [name]);
    return rows[0].id
  }

  static async getCarNameById(id:number): Promise<number | null> {
    const  { rows } = await db_connection.query('SELECT name FROM car WHERE id = $1 AND deleted_at IS NULL', [id]);
    return rows[0].name
  }
}

export default CarsDao;