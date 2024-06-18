import express, { Request, Response, NextFunction } from 'express';
import { chargingMapDao } from '../DAO'

const chargingMapRouter = express.Router();

//   // 충전소 이름으로 조회 & 페이지네이션 라우터
chargingMapRouter.get('/maps/:station', async(req, res, next) => {
  try {
    const station = req.params.station;
    const page = parseInt(req.query.page as string, 10);
    const limit = parseInt(req.query.limit as string, 10);

    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
      return res.status(400).json({ message: '유효한 페이지 및 데이터 수를 입력해야 합니다.'})
    }

    const charger = await chargingMapDao.getChargerByStation(station, page, limit)

    if (!charger || charger.length === 0) {
      return res.status(404).json({ message: '해당되는 충전소를 찾을 수 없습니다.'})
    }

    res.json({
      charger,
    })
  } catch (err) {
    next(err)
  }
})

export default chargingMapRouter;
