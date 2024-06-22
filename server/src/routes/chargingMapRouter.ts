import express, { Request, Response, NextFunction } from 'express';
import { chargingMapDao } from '../DAO';

const chargingMapRouter = express.Router();

// 충전소 이름으로 조회 & 페이지네이션 라우터
chargingMapRouter.get('/maps', async (req, res, next) => {
  try {
    const station = String(req.query.station);
    const page = parseInt(req.query.page as string, 10);
    const limit = parseInt(req.query.limit as string, 10);
    const zone = String(req.query.zone)
    const type = String(req.query.type)

    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
      return res
        .status(400)
        .json({ message: '유효한 페이지 및 데이터 수를 입력해야 합니다.' });
    }

    
    if (!station) return null;
    
    // 전체 충전소 조회
    const totalChargers = await chargingMapDao.getChgrByStation(
      station,
      page,
      limit,
    );

    if (!totalChargers || totalChargers.length === 0) {
      return res
      .status(404)
      .json({ message: '해당되는 충전소를 찾을 수 없습니다.' });
    }
    
    // 전체 충전소 카운팅
    const totalChargersCount = totalChargers.length


    // 충전소명 & 지역코드 조회
    const chargersByStationAndZone = await chargingMapDao.getChrgByStationAndZone(
      station,
      zone,
      page,
      limit
    )

    // 충전소명 & 지역코드 카운팅
    const chargerByStationAndZoneCount = chargersByStationAndZone.length



    // 충전소명 & 타입 조회
    const chargersByStationAndType = await chargingMapDao.getChrgByStationAndType(
      station,
      type,
      page,
      limit
    )

    // 충전소명 & 타입 카운팅
    const chargersByStationAndTypeCount = chargersByStationAndType.length 



    // 충전소명 & 지역코드 & 타입 조회 (All Query)
    const chargersByAllQuery = await chargingMapDao.getChrgByAllQuery(
      station,
      zone,
      type,
      page,
      limit
    )

    // 충전소명 & 타입 카운팅
    const chargersByAllQueryCount = chargersByAllQuery.length; 


    res.json({
      totalChargers,
      chargersByStationAndZone,
      chargersByStationAndType,
      chargersByAllQuery,
      totalChargersCount,
      chargerByStationAndZoneCount,
      chargersByStationAndTypeCount,
      chargersByAllQueryCount,
    });
  } catch (err) {
    next(err);
  }
});

export default chargingMapRouter;


// "totalChargersCount":1154,"chargerByStationAndZoneCount":242,"chargersByStationAndTypeCount":824,"chargersByAllQueryCount":165}
  
// {
//   "totalChargersCount": 500,
//   "chargerByStationAndZoneCount": 242,
//   "chargersByStationAndTypeCount": 500,
//   "chargersByAllQueryCount": 165
// }