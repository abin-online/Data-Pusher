import { IAccountUseCase } from "../../../application/IUseCases/IAccountUseCase";
import { AccountUseCase } from "../../../application/useCases/AccountUseCase";
import { IAccountRepository } from "../../../domain/respositories/IAccountRepository";
import { AccountRepository } from "../../../infrastructure/repositories/AccountRepository";
import { AccountController } from "../../controller/AccountController";

const accountRepository: IAccountRepository = new AccountRepository();
const accountUseCase: IAccountUseCase = new AccountUseCase(accountRepository);
export const accountController = new AccountController(accountUseCase);