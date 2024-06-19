import express, { Request, Response, NextFunction } from 'express';
import { carsDao, carsImgDao } from '../DAO';

const carImgRouter = express.Router();

// const img_url_list = [
//   { 1: 'https://autoimg.danawa.com/photo/4022/model_360.png' },
//   { 2: 'https://autoimg.danawa.com/photo/4647/model_360.png' },
//   { 3: 'https://autoimg.danawa.com/photo/4624/model_360.png' },
//   { 4: 'https://autoimg.danawa.com/photo/4013/50650/color_12_360.png' },
//   { 5: 'https://autoimg.danawa.com/photo/4567/51451/color_16_360.png' },
//   { 6: 'https://autoimg.danawa.com/photo/4492/model_360.png' },
//   { 7: 'https://autoimg.danawa.com/photo/3687/model_360.png' },
//   { 8: 'https://autoimg.danawa.com/photo/4128/50784/lineup_360.png' },
//   { 9: 'https://autoimg.danawa.com/photo/4087/model_360.png' },
//   { 10: 'https://autoimg.danawa.com/photo/4022/50812/color_17_360.png' },
//   { 11: 'https://autoimg.danawa.com/photo/4610/model_360.png' },
//   { 12: 'https://autoimg.danawa.com/photo/4510/51735/color_11_360.png' },
//   { 13: 'https://autoimg.danawa.com/photo/4399/model_360.png' },
//   { 14: 'https://autoimg.danawa.com/photo/4005/model_360.png' },
//   { 15: 'https://autoimg.danawa.com/photo/4015/model_360.png' },
//   { 16: 'https://autoimg.danawa.com/photo/4062/50617/color_11_360.png' },
//   { 17: 'https://autoimg.danawa.com/photo/4396/50832/color_10_360.png' },
//   { 18: 'https://autoimg.danawa.com/photo/4111/model_360.png' },
//   { 19: 'https://autoimg.danawa.com/photo/3983/model_360.png' },
//   { 20: 'https://autoimg.danawa.com/photo/4404/model_360.png' },
//   { 21: 'https://autoimg.danawa.com/photo/4430/model_360.png' },
//   { 22: 'https://autoimg.danawa.com/photo/4528/50527/color_16_360.png' },
//   { 23: 'https://autoimg.danawa.com/photo/4046/51043/color_13_360.png' },
//   { 24: 'https://autoimg.danawa.com/photo/4061/48752/color_14_360.png' },
//   { 25: 'https://autoimg.danawa.com/photo/4558/model_360.png' },
//   { 26: 'https://autoimg.danawa.com/photo/4403/51425/color_18_360.png' },
//   { 27: 'https://autoimg.danawa.com/photo/4626/model_360.png' },
//   { 28: 'https://autoimg.danawa.com/photo/3724/model_360.png' },
//   { 29: 'https://autoimg.danawa.com/photo/3826/model_360.png' },
//   { 30: 'https://autoimg.danawa.com/photo/3738/model_360.png' },
//   { 31: 'https://autoimg.danawa.com/photo/4468/model_360.png' },
//   { 32: 'https://autoimg.danawa.com/photo/4181/model_360.png' },
//   { 33: 'https://autoimg.danawa.com/photo/4372/51554/color_15_360.png' },
//   { 34: 'https://autoimg.danawa.com/photo/4446/model_360.png' },
//   { 35: 'https://autoimg.danawa.com/photo/4027/model_360.png' },
//   { 36: 'https://autoimg.danawa.com/photo/4199/model_360.png' },
//   { 37: 'https://autoimg.danawa.com/photo/4381/50967/color_20_360.png' },
//   { 38: 'https://autoimg.danawa.com/photo/4401/model_360.png' },
//   { 39: 'https://autoimg.danawa.com/photo/4048/model_360.png' },
//   { 40: 'https://autoimg.danawa.com/photo/4009/model_360.png' },
//   { 41: 'https://autoimg.danawa.com/photo/4043/51464/color_07_360.png' },
//   { 42: 'https://autoimg.danawa.com/photo/4605/model_200.png' },
//   { 43: 'https://autoimg.danawa.com/photo/4436/model_200.png' },
//   { 44: 'https://autoimg.danawa.com/photo/4437/model_200.png' },
//   { 45: 'https://autoimg.danawa.com/photo/4407/model_200.png' },
//   { 46: 'https://autoimg.danawa.com/photo/4526/model_200.png' },
//   { 47: 'https://autoimg.danawa.com/photo/4467/model_200.png' },
//   { 48: 'https://autoimg.danawa.com/photo/3976/model_200.png' },
//   { 49: 'https://autoimg.danawa.com/photo/4406/model_200.png' },
//   { 50: 'https://autoimg.danawa.com/photo/4433/model_200.png' },
//   { 51: 'https://autoimg.danawa.com/photo/4375/model_200.png' },
//   { 52: 'https://autoimg.danawa.com/photo/4183/model_200.png' },
//   { 53: 'https://autoimg.danawa.com/photo/4619/51708/color_11_360.png' },
//   { 54: 'https://autoimg.danawa.com/photo/4413/model_360.png' },
//   { 55: 'https://autoimg.danawa.com/photo/4498/model_360.png' },
//   { 56: 'https://autoimg.danawa.com/photo/4091/model_360.png' },
//   { 57: 'https://autoimg.danawa.com/photo/3710/model_360.png' },
//   { 58: 'https://autoimg.danawa.com/photo/3904/model_360.png' },
//   { 59: 'https://autoimg.danawa.com/photo/4561/model_360.png' },
//   { 60: 'https://autoimg.danawa.com/photo/4115/model_360.png' },
//   { 61: 'https://autoimg.danawa.com/photo/4186/model_360.png' },
//   { 62: 'https://autoimg.danawa.com/photo/4004/model_360.png' },
//   { 64: 'https://autoimg.danawa.com/photo/4493/model_360.png' },
//   { 63: 'https://autoimg.danawa.com/photo/4570/model_360.png' },
//   { 65: 'https://autoimg.danawa.com/photo/4058/model_360.png' },
//   { 66: 'https://autoimg.danawa.com/photo/4408/model_200.png' },
//   { 67: 'https://autoimg.danawa.com/photo/4542/model_200.png' },
//   { 68: 'https://autoimg.danawa.com/photo/4397/model_200.png' },
//   { 69: 'https://autoimg.danawa.com/photo/4121/model_200.png' },
//   { 70: 'https://autoimg.danawa.com/photo/4163/model_200.png' },
//   { 71: 'https://autoimg.danawa.com/photo/3815/model_200.png' },
//   { 72: 'https://autoimg.danawa.com/photo/4583/model_360.png' },
//   { 73: 'https://autoimg.danawa.com/photo/3836/model_360.png' },
//   { 74: 'https://autoimg.danawa.com/photo/4611/model_360.png' },
//   { 75: 'https://autoimg.danawa.com/photo/4398/model_360.png' },
//   { 76: 'https://autoimg.danawa.com/photo/4456/model_360.png' },
//   { 77: 'https://autoimg.danawa.com/photo/4577/model_360.png' },
//   { 78: 'https://autoimg.danawa.com/photo/4185/model_360.png' },
//   { 79: 'https://autoimg.danawa.com/photo/4124/model_360.png' },
//   { 80: 'https://autoimg.danawa.com/photo/4457/model_360.png' },
//   { 81: 'https://autoimg.danawa.com/photo/4578/model_360.png' },
//   { 82: 'https://autoimg.danawa.com/photo/4458/model_360.png' },
// ];

// 전기차 이미지 URL 데이터베이스 삽입 라우터, id로 맞춰서 삽입 
// carImgRouter.get('/cars-img',
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       // 전체 전기차 id 조회
//       const carsId = await carsDao.getCarsId();
//       console.log(carsId)

//       if (!carsId || carsId.length === 0) {
//         return res.status(404).json({ message: '해당되는 전기차 id를 찾을 수 없습니다.' })
//       }

      
//       const insertImgUrl = carsId.map((carId) => {
//         img_url_list.map(async(img) => {
//           const img_id = parseInt(Object.keys(img)[0], 10);
//           const img_url = Object.values(img)[0];
//           const car_id = carId.id;
//           if (img_id === car_id) {
//             const insertImgUrl = await carsImgDao.insertCarsImgUrl(
//               car_id,
//               img_url,
//             );
//           }
//         });
//       })
//       res.json({
//         insertImgUrl
//       })
//     } catch (err) {
//       next(err);
//     }
//   }
// )


// 전체 전기차 이미지 조회
carImgRouter.get('/car-imgs',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const carsImg = await carsImgDao.getCarsImg();

      if (!carsImg || carsImg.length === 0) {
        return res.status(404).json({ message: '해당되는 전기차 이미지를 찾을 수 없습니다.' })
      }

      res.json({
        carsImg
      })
    } catch (err) {
      next(err);
    }
  }
)

// 개별 전기차 이미지 조회
carImgRouter.get(
  '/car-imgs/:car_id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const car_id = parseInt(req.params.car_id, 10)

      if (isNaN(car_id) || car_id === 0) {
        return res.status(400).json({ message: '유효한 전기차 ID를 입력해야 합니다.' })
      }

      const carImg = await carsImgDao.getCarImg(car_id);

      if (!carImg || carImg.length === 0) {
        return res
          .status(404)
          .json({ message: '해당되는 전기차 이미지를 찾을 수 없습니다.' });
      }

      res.json({
        carImg,
      });
    } catch (err) {
      next(err);
    }
  },
);


export default carImgRouter;
