import { Types } from "mongoose";
import { IDestination } from "../entities/IDestination";

export interface IDestinationRepository {
  createDestination(data: IDestination): Promise<IDestination>;
  getDestinationsByAccount(accountId: string): Promise<IDestination[]>;
  getDestinationById(id: string, accountId: string): Promise<IDestination | null>;
  updateDestination(id: string, data: Partial<IDestination>, accountId: string, userId: Types.ObjectId): Promise<IDestination | null>;
  deleteDestination(id: string, accountId: string): Promise<boolean>;
  searchDestinations(query: string, accountId: string): Promise<IDestination[]>;
}