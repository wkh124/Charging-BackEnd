import express, { Request, Response, NextFunction } from 'express';
import { chargingMapDao } from '../DAO';

const chargingMapRouter = express.Router();

//   // 충전소 이름으로 조회 & 페이지네이션 라우터
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
    
    // 충전소 조회
    const chargers = await chargingMapDao.getChargerByStation(
      station,
      page,
      limit,
    );

    if (!chargers || chargers.length === 0) {
      return res
      .status(404)
      .json({ message: '해당되는 충전소를 찾을 수 없습니다.' });
    }
    
    // 충전소 카운팅
    const chargerTotalCount = chargers.length


    // 지역으로 조회 및 카운팅
    const chargerByZone = chargers.filter(charger => 
      charger.zcode === zone && 
      charger !== null
    )
    const chargerByZoneCount = chargerByZone.length;


    // 충전기 타입으로 조회 및 카운팅
    const chargerByType = chargers.filter(charger => 
      charger.chgerType === type && 
      charger !== null
    )
    const chargerByTypeCount = chargerByType.length;


    // 지역 & 충전기 타입으로 조회 및 카운팅
    const chargerByZoneAndType = chargers.filter(charger => 
      charger.zcode === zone && 
      charger.chgerType === type && 
      charger !== null
    )
    const chargerByZoneAndTypeCount = chargerByZoneAndType.length;

    res.json({
      chargers,
      chargerByZone,
      chargerByType,
      chargerTotalCount,
      chargerByZoneCount,
      chargerByTypeCount,
      chargerByZoneAndTypeCount,
    });
  } catch (err) {
    next(err);
  }
});

export default chargingMapRouter;
