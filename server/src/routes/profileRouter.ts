import express, { Request, Response, NextFunction } from 'express';
import { userDao, userCarDao } from '../DAO';
import { ensureAuthenticated } from '../middleware/authUser';

const profileRouter = express.Router();

// 사용자의 인증된 정보를 표현하는 인터페이스
interface AuthenticatedUser {
  user_id: string;
  displayName: string;
  nickName: string;
  email: string;
  platform_type: string;
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
    // 사용자의 프로필 정보 조회
    const userProfile = await userDao.findUserById(user.user_id);

    if (!userProfile) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    // 필요하지 않은 필드를 제외한 사용자 정보를 반환
    const { user_id, displayName, nickName } = userProfile;

    // 사용자의 차량 정보
    const userCars = await userCarDao.getUserCar(user.user_id);
    
    // 사용자와 차량 정보를 응답으로 반환
    res.json({
      user: { user_id, displayName, nickName},
      userCars,
      message: '프로필 페이지입니다',
    });
  } catch (err) {
    console.error(err);
    
    res.status(500).json({ error: '내부 서버 오류' });
  }
});

// 프로필 업데이트
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
    await userDao.updateUser(user.user_id, displayName, nickName);

    // carId가 제공된 경우 차량 정보를 업데이트
    if (carId) {
      await userCarDao.updateUserCar(user.user_id, carId);
    }

    res.json({ message: '프로필이 성공적으로 업데이트되었습니다' });
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: '내부 서버 오류' });
  }
});

// 유저 soft_delete
profileRouter.delete('/profile', ensureAuthenticated, async (req: Request, res: Response) => {
  const authReq = req as AuthenticatedRequest;
  const user = authReq.user;

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

export default profileRouter;
