import { Request, Response } from 'express';
import { IUserAuthenticationUsecase } from '../../application/IUseCases/IAuthentication';
import { HttpStatusCode } from '../../shared/types/HttpStatusCode';

export class UserAuthController {
    constructor(
        private userAuthUseCase: IUserAuthenticationUsecase
    ) { }

    // User Signup
    signup = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Missing required fields' });
                return;
            }

            const newUser = await this.userAuthUseCase.signup( email, password);

            res.status(HttpStatusCode.CREATED).json({
                message: 'User signed up successfully',
                user: {
                    id: newUser._id,
                    email: newUser.email,
                },
            });
        } catch (error) {
            console.error('Signup error:', error);
            res.status(HttpStatusCode.BAD_REQUEST).json({ message: (error as Error).message || 'Signup failed' });
        }
    };

    // User Login
    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Email and password are required' });
                return;
            }

            const { accessToken, refreshToken, user } = await this.userAuthUseCase.login(email, password);

            res.status(HttpStatusCode.OK).json({
                message: 'Login successful',
                accessToken,
                refreshToken,
                user: {
                    id: user._id,
                    email: user.email,
                },
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(HttpStatusCode.BAD_REQUEST).json({ message: (error as Error).message || 'Login failed' });
        }
    };
}
