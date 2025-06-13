import { IAccountUseCase } from "../../../application/IUseCases/IAccountUseCase";
import { IDataHandlerUseCase } from "../../../application/IUseCases/IDataHandlerUseCase";
import { IDestinationUseCase } from "../../../application/IUseCases/IDestinationUseCase";
import { ILogUseCase } from "../../../application/IUseCases/ILogUseCase";
import { AccountUseCase } from "../../../application/useCases/AccountUseCase";
import { DataHandlerUseCase } from "../../../application/useCases/DataHandlerUseCase";
import { DestinationUseCase } from "../../../application/useCases/DestinationUseCase";
import { LogUseCase } from "../../../application/useCases/LogUseCase";
import { IAccountRepository } from "../../../domain/respositories/IAccountRepository";
import { IDestinationRepository } from "../../../domain/respositories/IDestinationRepository";
import { ILogRepository } from "../../../domain/respositories/ILogRepository";
import { AccountRepository } from "../../../infrastructure/repositories/AccountRepository";
import { DestinationRepository } from "../../../infrastructure/repositories/DestinationRepository";
import { LogRepository } from "../../../infrastructure/repositories/LogRepository";
import { DataHandlerController } from "../../controller/DataHandlerController";


const accountRepository: IAccountRepository = new AccountRepository();
const accountUseCase: IAccountUseCase = new AccountUseCase(accountRepository);


const destinationRepository: IDestinationRepository = new DestinationRepository()
const destinationUseCase: IDestinationUseCase = new DestinationUseCase(destinationRepository);

const logRepository: ILogRepository = new LogRepository();
const logUseCase: ILogUseCase = new LogUseCase(logRepository);

const dataHandlerUseCase: IDataHandlerUseCase = new DataHandlerUseCase(accountUseCase, destinationUseCase, logUseCase);

 const dataHandlerController = new DataHandlerController(dataHandlerUseCase);


 export {
    dataHandlerUseCase, 
    dataHandlerController
 }