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
  static async getChargerByStation(station: string, page: number, limit: number): Promise<ChargingMap[]> {
    const offset = (page - 1) * limit;
    const { rows } = await db_connection.query(
      `SELECT DISTINCT TRIM("statNm") AS "statNm", 
        MAX(addr) as addr, 
        MAX(zcode) as zcode, 
        MAX("chgerType") as "chgerType",
        MAX("busiNm") as "busiNm",
        MAX(kind) as kind,
        MAX("parkingFree") as parkingFree
      FROM charging_map 
      WHERE REPLACE("statNm", ' ', '')
      LIKE '%' || REPLACE($1, ' ', '') || '%'
      GROUP BY TRIM("statNm")
      LIMIT $2 OFFSET $3`,
      [station, limit, offset],
    );
    return rows
  }
}

export default ChargingMapDao;
