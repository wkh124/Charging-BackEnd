import { Request, Response, NextFunction } from 'express';
import AppError from '../../utils/appError';
import commonErrors from '../../utils/commonErrors';

const checkCompleteCommentFrom = (from: 'body' | 'query' | 'params') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { content } = req[from];
    
    // Check if the content is missing or empty
    if (content === undefined || content === "") {
      next(
        new AppError(
          commonErrors.requestValidationError,
          `${from}: content는 필수값입니다.`,
          400
        )
      );
      return;
    }
    
    next();
  };
};

export default checkCompleteCommentFrom;

