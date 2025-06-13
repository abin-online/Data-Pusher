import { Types } from "mongoose";
import { IDestinationUseCase } from "../IUseCases/IDestinationUseCase";
import { IDestinationRepository } from "../../domain/respositories/IDestinationRepository";
import { IDestination } from "../../domain/entities/IDestination";

export class DestinationUseCase implements IDestinationUseCase {
  constructor(private repository: IDestinationRepository) {}

  createDestination(data: IDestination, accountId: string, userId: Types.ObjectId): Promise<IDestination> {
    return this.repository.createDestination(data);
  }

  getDestinationsByAccount(accountId: string): Promise<IDestination[]> {
    return this.repository.getDestinationsByAccount(accountId);
  }

  getDestinationById(id: string, accountId: string): Promise<IDestination | null> {
    return this.repository.getDestinationById(id, accountId);
  }

  updateDestination(id: string, data: Partial<IDestination>, accountId: string, userId: Types.ObjectId): Promise<IDestination | null> {
    return this.repository.updateDestination(id, data, accountId, userId);
  }

  deleteDestination(id: string, accountId: string): Promise<boolean> {
    return this.repository.deleteDestination(id, accountId);
  }

  searchDestinations(query: string, accountId: string): Promise<IDestination[]> {
    return this.repository.searchDestinations(query, accountId);
  }
}