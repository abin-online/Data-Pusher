import { IAccountMemberUseCase } from "../../../application/IUseCases/IAccountMemberUseCase";
import { AccountMemberUseCase } from "../../../application/useCases/AccountMemberUseCase";
import { IAuthService } from "../../../domain/IServices/IAuthService";
import { IAccountMemberRepository } from "../../../domain/respositories/IAccountMemberRepository";
import { IUserRepository } from "../../../domain/respositories/IUserRepository";
import { AccountMemberRepository } from "../../../infrastructure/repositories/AccountMemberRepository";
import { UserRepository } from "../../../infrastructure/repositories/UserRepository";
import { AuthService } from "../../../infrastructure/services/AuthService";
import { AccountMemberController } from "../../controller/AccountMemberController";

const accountMemberRepository: IAccountMemberRepository = new AccountMemberRepository()
const userRepository: IUserRepository = new UserRepository();
const authService: IAuthService = new AuthService();
const accountMemberUseCase: IAccountMemberUseCase = new AccountMemberUseCase(accountMemberRepository, userRepository, authService);
export const accountMemberController = new AccountMemberController(accountMemberUseCase);