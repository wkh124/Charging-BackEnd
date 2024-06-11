import express, { Request, Response, NextFunction } from 'express';
import UserDao from '../DAO/userDao';
import UserCarDao from '../DAO/userCarDao';
import { ensureAuthenticated } from '../middleware/authUser';

const profileRouter = express.Router();

// 사용자의 인증된 정보를 표현하는 인터페이스
interface AuthenticatedUser {
  user_id: string;
  displayName: string;
  nickName: string;
  email: string;
  platform_type: string;
  verified_email: number;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}

// Request 인터페이스를 확장하여 인증된 사용자 정보를 포함하는 인터페이스 정의
interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

// 내 프로필 페이지 라우트
profileRouter.get('/profile', ensureAuthenticated, async (req: Request, res: Response) => {
  // req 객체를 AuthenticatedRequest 타입으로 단언
  const authReq = req as AuthenticatedRequest;
  const user = authReq.user;

  // 사용자가 인증되지 않은 경우 401 오류 반환
  if (!user) {
    return res.status(401).json({ error: '인증되지 않음' });
  }

  try {
    // 사용자의 차량 정보
    const userCars = await UserCarDao.getUserCar(user.user_id);

    // 사용자와 차량 정보를 응답으로 반환
    res.json({
      user,
      userCars,
      message: '프로필 페이지입니다',
    });
  } catch (err) {
    console.error(err);
    // 내부 서버 오류가 발생한 경우 500 오류 반환
    res.status(500).json({ error: '내부 서버 오류' });
  }
});

// 프로필 업데이트 라우트
profileRouter.put('/profile', ensureAuthenticated, async (req: Request, res: Response) => {
  // req 객체를 AuthenticatedRequest 타입으로 단언
  const authReq = req as AuthenticatedRequest;
  const user = authReq.user;

  // 사용자가 인증되지 않은 경우 401 
  if (!user) {
    return res.status(401).json({ error: '인증되지 않음' });
  }

  // 업데이트할 데이터 추출
  const { displayName, nickName, carId } = req.body;

  try {
    // 사용자 정보를 업데이트
    await UserDao.updateUser(user.user_id, displayName, nickName);

    // carId가 제공된 경우 차량 정보를 업데이트
    if (carId) {
      await UserCarDao.updateUserCar(user.user_id, carId);
    }

    // 업데이트 성공 메시지 응답으로 반환
    res.json({ message: '프로필이 성공적으로 업데이트되었습니다' });
  } catch (err) {
    console.error(err);
    // 내부 서버 오류가 발생한 경우 500 오류 반환
    res.status(500).json({ error: '내부 서버 오류' });
  }
});

export default profileRouter;
