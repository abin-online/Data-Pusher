import { IDestinationUseCase } from "../../../application/IUseCases/IDestinationUseCase";
import { DestinationUseCase } from "../../../application/useCases/DestinationUseCase";
import { IDestinationRepository } from "../../../domain/respositories/IDestinationRepository";
import { DestinationRepository } from "../../../infrastructure/repositories/DestinationRepository";
import { DestinationController } from "../../controller/DestinationController";

const destinationRepository: IDestinationRepository = new DestinationRepository();
const destinationUseCase: IDestinationUseCase = new DestinationUseCase(destinationRepository);
export const destinationController = new DestinationController(destinationUseCase);