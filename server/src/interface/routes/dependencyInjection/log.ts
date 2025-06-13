import { ILogUseCase } from "../../../application/IUseCases/ILogUseCase";
import { LogUseCase } from "../../../application/useCases/LogUseCase";
import { ILogRepository } from "../../../domain/respositories/ILogRepository";
import { LogRepository } from "../../../infrastructure/repositories/LogRepository";
import { LogController } from "../../controller/LogController";

const logRepository : ILogRepository = new LogRepository();
const logUseCase : ILogUseCase = new LogUseCase(logRepository);
export const logController = new LogController(logUseCase);