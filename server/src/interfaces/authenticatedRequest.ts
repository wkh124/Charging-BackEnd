import { Request } from 'express';

export default interface AuthenticatedRequest extends Request {
    user?: {
        user_id: string;
        profile_pic: string;
    };
  }