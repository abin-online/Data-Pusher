import { IUserAuthenticationUsecase } from '../IUseCases/IAuthentication';
import { IUserRepository } from '../../domain/respositories/IUserRepository';
import { IAuthService } from '../../domain/IServices/IAuthService';
import { IUser } from '../../domain/entities/IUser';
import { Types } from 'mongoose';

export class UserAuthenticationUsecase implements IUserAuthenticationUsecase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly authService: IAuthService
    ) { }

    async signup(email: string, password: string): Promise<IUser> {
        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new Error('User already exists with this email');
        }

        const passwordHash = await this.authService.hashPassword(password);

        const newUser = await this.userRepository.createUser({
            email,
            password: passwordHash
        });

        return newUser;
    }

    async login(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: IUser;
    }> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isPasswordValid = await this.authService.comparePassword(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        const { accessToken, refreshToken } = this.authService.generateTokens(user._id as Types.ObjectId, 'user');

        return {
            accessToken,
            refreshToken,
            user,
        };
    }
}
