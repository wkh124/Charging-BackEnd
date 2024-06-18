import express, { Request, Response, NextFunction } from 'express';
import { carsDao } from '../DAO';

const carRouter = express.Router();

// 전체 전기차 정보 페이지 라우트 (로그인 인증 필요 없음)
carRouter.get(
  '/cars',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 전체 전기차 정보 조회 및 response 반환
      const cars = await carsDao.getCars();

      if (!cars || cars.length === 0) {
        return res
          .status(404)
          .json({ message: '해당되는 전기차들을 찾을 수 없습니다.' });
      }

      res.json({
        cars,
      });
    } catch (err) {
      // service에서 에러가 발생하면 try/catch문으로 잡아서 next 함수로 에러를 중앙 error handler에게 전달4
      next(err);
    }
  },
);

// 개별 전기차 정보 페이지 라우트 (로그인 인증 필요 없음)
carRouter.get('/cars/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    // 전기차 id 값이 숫자가 아닌 경우 에러
    if (isNaN(id) || id === 0) {
      return res
        .status(400)
        .json({ message: '유효한 전기차 ID를 제공해야 합니다.' });
    }

    // 개별 전기차 정보
    const car = await carsDao.getCar(id);

    // 개별 전기차 정보가 없는 경우
    if (!car || car.length === 0) {
      return res
        .status(404)
        .json({ message: '해당되는 전기차를 찾을 수 없습니다.' });
    }

    // 개별 전기차 정보 response 반환
    res.json({
      car,
    });
  } catch (err) {
    // service에서 에러가 발생하면 try/catch문으로 잡아서 next 함수로 에러를 중앙 error handler에게 전달
    next(err);
  }
});

export default carRouter;
