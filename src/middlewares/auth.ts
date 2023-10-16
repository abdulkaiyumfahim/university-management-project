/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../helpers/jwtHelpers';
import config from '../config';
import { Secret } from 'jsonwebtoken';

// interface MyRequest extends Request {
//   user: {
//     role: ENUM_USER_ROLE;
//     userId: string;
//   };
// }

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized to access this',
        );
      }
      let verifiedUser = null;
      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

      req.user = verifiedUser;
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
