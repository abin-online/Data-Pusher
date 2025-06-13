import { Request, Response, NextFunction } from 'express';
import { IAuthService } from '../../domain/IServices/IAuthService';
import { IUserRepository } from '../../domain/respositories/IUserRepository';
import { IUser } from '../../domain/entities/IUser';
import { AuthMessages } from '../../shared/messages';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export class AuthMiddleware {
  constructor(
    private authService: IAuthService,
    private userRepository: IUserRepository
  ) { }

  authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      const refreshToken = req.headers['x-refresh-token'] as string;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ success: false, message: AuthMessages.ACCESS_TOKEN_REQUIRED });
        return;
      }

      const accessToken = authHeader.split(' ')[1];
      let decoded: { userId: string; role: string } | null = this.authService.verifyToken(accessToken);

      if (!decoded && refreshToken) {
        const refreshDecoded = this.authService.verifyRefreshToken(refreshToken);

        if (refreshDecoded) {

          decoded = {
            userId: refreshDecoded.userId.toString(),
            role: refreshDecoded.role,
          };

          const newTokens = this.authService.generateTokens(refreshDecoded.userId, refreshDecoded.role);
          res.setHeader('Authorization', `Bearer ${newTokens.accessToken}`);
        } else {
          res.status(401).json({ success: false, message: AuthMessages.SESSION_EXPIRED });
          return;
        }
      }


      if (!decoded) {
        res.status(401).json({ success: false, message: AuthMessages.INVALID_OR_EXPIRED_TOKEN });
        return;
      }

      const user = await this.userRepository.findById(decoded.userId);
      if (!user) {
        res.status(401).json({ success: false, message: AuthMessages.USER_NOT_FOUND });
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Auth error:', error);
      res.status(500).json({ success: false, message: AuthMessages.AUTH_FAILED });
    }
  };


  isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // @ts-ignore 
    const user = req.user;

    if (!user || user.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Admin access only"
      });
      return;
    }

    next();
  }
}
