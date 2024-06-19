import { db_connection } from '../../config';

interface ChargingMap {
  statNm: string;
  chgerId: string;
  chgerType: string;
  addr: string;
  useTime: string;
  lat: number;
  lng: number;
  busiNm: string;
  busiCall: string;
  zcode: string;
  kind: string;
  parkingFree: string;
  note: string;
  delYn: string;
}

class ChargingMapDao {
  // 충전소 이름으로 조회 & 페이지네이션 쿼리
  static async getChgrByStation(station: string, page: number, limit: number): Promise<ChargingMap[]> {
    const offset = (page - 1) * limit;
    const { rows } = await db_connection.query(
      `SELECT DISTINCT TRIM("statNm") AS "statNm",
        "statId",
        "chgerType",
        "addr", 
        "lat", 
        "lng", 
        "busiNm", 
        "zcode", 
        "kind", 
        "parkingFree", 
        "limitYn"
      FROM charging_map 
      WHERE REPLACE(TRIM("statNm"), ' ', '')
      LIKE '%' || REPLACE($1, ' ', '') || '%'
      LIMIT $2 OFFSET $3`,
      [station, limit, offset],
    );
    return rows
  }

  // 충전소 이름 및 지역코드 조회 & 페이지네이션 쿼리
  static async getChrgByStationAndZone(station: string, zone: string, page: number, limit: number): Promise<ChargingMap[]> {
    const offset = (page - 1) * limit;
    const { rows } = await db_connection.query(
      `SELECT DISTINCT TRIM("statNm") AS "statNm",
        "statId",
        "chgerType",
        "addr", 
        "lat", 
        "lng", 
        "busiNm", 
        "zcode", 
        "kind", 
        "parkingFree", 
        "limitYn"
      FROM charging_map 
      WHERE REPLACE(TRIM("statNm"), ' ', '')
      LIKE '%' || REPLACE($1, ' ', '') || '%'
      AND zcode = $2
      LIMIT $3 OFFSET $4`,
      [station, zone, limit, offset],
    );
    return rows
  }

  // 충전소 이름 및 타입 조회 & 페이지네이션 쿼리
  static async getChrgByStationAndType(station: string, type: string, page: number, limit: number): Promise<ChargingMap[]> {
    const offset = (page - 1) * limit;
    const { rows } = await db_connection.query(
      `SELECT DISTINCT TRIM("statNm") AS "statNm",
        "statId",
        "chgerType",
        "addr", 
        "lat", 
        "lng", 
        "busiNm", 
        "zcode", 
        "kind", 
        "parkingFree", 
        "limitYn"
      FROM charging_map 
      WHERE REPLACE(TRIM("statNm"), ' ', '')
      LIKE '%' || REPLACE($1, ' ', '') || '%'
      AND "chgerType" = $2
      LIMIT $3 OFFSET $4`,
      [station, type, limit, offset],
    );
    return rows
  }


  // 충전소 이름, 지역코드, 타입 조회 & 페이지네이션 쿼리
  static async getChrgByAllQuery(station: string, zone: string, type: string, page: number, limit: number): Promise<ChargingMap[]> {
    const offset = (page - 1) * limit;
    const { rows } = await db_connection.query(
      `SELECT DISTINCT TRIM("statNm") AS "statNm",
        "statId",
        "chgerType",
        "addr", 
        "lat", 
        "lng", 
        "busiNm", 
        "zcode", 
        "kind", 
        "parkingFree", 
        "limitYn"
      FROM charging_map 
      WHERE REPLACE(TRIM("statNm"), ' ', '')
      LIKE '%' || REPLACE($1, ' ', '') || '%'
      AND zcode = $2
      AND "chgerType" = $3
      LIMIT $4 OFFSET $5`,
      [station, zone, type, limit, offset],
    );
    return rows
  }
}



export default ChargingMapDao;