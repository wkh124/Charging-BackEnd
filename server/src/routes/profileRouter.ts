import express, { Request, Response, NextFunction } from 'express';
import { userDao, userCarDao, carsImgDao, carsDao } from '../DAO';
import { ensureAuthenticated } from '../middleware/authUser';
import AuthenticatedRequest  from '../interfaces/authenticatedRequest';

const profileRouter = express.Router();

// 내 프로필 페이지 라우트
profileRouter.get('/profile', ensureAuthenticated, async (req: Request, res: Response) => {
  // req 객체를 AuthenticatedRequest 타입으로 단언
  const { user } = req as AuthenticatedRequest;

  // 사용자가 인증되지 않은 경우 401 오류 반환
  if (!user) {
    return res.status(401).json({ error: '인증되지 않음' });
  }

  try {
    // 사용자의 프로필 정보 조회
    const userProfile = await userDao.findUserById(user.user_id);

    if (!userProfile) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    // 필요하지 않은 필드를 제외한 사용자 정보를 반환
    const { nickName, profile_pic } = userProfile;

    // 사용자의 차량 정보
    const carId = await userCarDao.getUserCar(user.user_id);
    console.log(carId);

    if (carId.length !== 0){
      const carImg = await carsImgDao.getCarImg(carId[0].car_id);
      const car=await carsDao.getCarBrandAndModel(carId[0].car_id);
      if (car !== null){
      res.json({
        user_id: user.user_id,
        user_img: profile_pic,
        user: nickName,
        car: car,
        car_img:carImg[0].img_url,
        message: '프로필 페이지입니다',
      });
    }
    }else{ 
    // 사용자와 차량 정보를 응답으로 반환
    res.json({
      user_id: user.user_id,
      user_img: profile_pic,
      user: nickName,
      car_img:"차량 정보가 없습니다.",
      message: '프로필 페이지입니다',
    });
  }
  } catch (err) {
    console.error(err);
    
    res.status(500).json({ error: '내부 서버 오류' });
  }
});

// 프로필 생성
// profileRouter.post('/profile', ensureAuthenticated, async (req: Request, res: Response) => {

//   const authReq = req as AuthenticatedRequest;
//   const user = authReq.user;

//   if (!user) {
//     return res.status(401).json({ error: '인증되지 않음' });
//   }

//   const { nickName, carName } = req.body;

//   try {
//     await userDao.updateUser(user.user_id, nickName);
//     if (carName.length !==0 ){
//     const carId= await userDao.findCarId(carName);
//       if (carId) {
//         await userCarDao.createUserCar(user.user_id, carId[0].id);
//        }
//       } 
//     res.json({ message: '프로필이 성공적으로 생성 되었습니다' });
//   } catch (err) {
//     console.error(err);

//     res.status(500).json({ error: '내부 서버 오류' });
//   }
// });

// 프로필 업데이트
profileRouter.put('/profile', ensureAuthenticated, async (req: Request, res: Response) => {

  const { user } = req as AuthenticatedRequest;

  if (!user) {
    return res.status(401).json({ error: '인증되지 않음' });
  }

  const { nickName, carName } = req.body;

  try {
    await userDao.updateUser(user.user_id, nickName);
    const car= await userCarDao.getUserCar(user.user_id)
        if (car.length !==0){
          await userCarDao.deleteUserCar(user.user_id)
        }
    if (carName.length !==0){
    const carId= await userDao.findCarId(carName);
      if (carId) {
        await userCarDao.createUserCar(user.user_id, carId[0].id);
        }
      }
    res.json({ message: '프로필이 성공적으로 업데이트되었습니다' });
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: '내부 서버 오류' });
  }
});

// // 프로필 업데이트
// profileRouter.put('/profile/cars', ensureAuthenticated, async (req: Request, res: Response) => {

//   const { user } = req as AuthenticatedRequest;

//   if (!user) {
//     return res.status(401).json({ error: '인증되지 않음' });
//   }

//   const { carName } = req.body;

//   try {
//     const car= await userCarDao.getUserCar(user.user_id)
//         if (car.length !==0){
//           await userCarDao.deleteUserCar(user.user_id)
//         }
//     if (carName.length !==0){
//     const carId= await userDao.findCarId(carName);
//       if (carId) {
//         await userCarDao.createUserCar(user.user_id, carId[0].id);
//         }
//       }
//     res.json({ message: '프로필이 성공적으로 업데이트되었습니다' });
//   } catch (err) {
//     console.error(err);

//     res.status(500).json({ error: '내부 서버 오류' });
//   }
// });

// // 프로필 업데이트
// profileRouter.put('/profile/nickname', ensureAuthenticated, async (req: Request, res: Response) => {

//   const { user } = req as AuthenticatedRequest;

//   if (!user) {
//     return res.status(401).json({ error: '인증되지 않음' });
//   }

//   const { nickName} = req.body;

//   try {
//     await userDao.updateUser(user.user_id, nickName);
//     res.json({ message: '프로필이 성공적으로 업데이트되었습니다' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: '내부 서버 오류' });
//   }
// });

// 유저 soft_delete
profileRouter.delete('/profile', ensureAuthenticated, async (req: Request, res: Response) => {
  const { user } = req as AuthenticatedRequest;

  if (!user) {
    return res.status(401).json({ error: '인증되지 않음' });
  }

  try {
    await userDao.deleteUser(user.user_id);
    res.json({ message: '계정이 성공적으로 삭제되었습니다' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '내부 서버 오류' });
  }
});


// 회원 탈퇴
profileRouter.get('/profile/logout', function (req, res, next) {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        next(err);
      } else {
        res
          .clearCookie('connect.sid', {
            secure: false,
            httpOnly: true,
            path: '/',
          })
          .status(200)
          .send('Ok.');
      }
    });
  }
});

export default profileRouter;
