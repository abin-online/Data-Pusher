import { DestinationModel } from "../database/model/DestinationModel";
import { IDestinationRepository } from "../../domain/respositories/IDestinationRepository";
import { IDestination } from "../../domain/entities/IDestination";
import { Types } from "mongoose";

export class DestinationRepository implements IDestinationRepository {
async createDestination(data: IDestination): Promise<IDestination> {
  const doc = await DestinationModel.create(data);
  return doc.toObject() as IDestination;
}


  async getDestinationsByAccount(accountId: string): Promise<IDestination[]> {
    return await DestinationModel.find({ account_id: accountId });
  }

  async getDestinationById(id: string, accountId: string): Promise<IDestination | null> {
    return await DestinationModel.findOne({ _id: id, account_id: accountId });
  }

  async updateDestination(id: string, data: Partial<IDestination>, accountId: string, userId: Types.ObjectId): Promise<IDestination | null> {
    return await DestinationModel.findOneAndUpdate(
      { _id: id, account_id: accountId },
      { $set: data },
      { new: true }
    );
  }

  async deleteDestination(id: string, accountId: string): Promise<boolean> {
    const result = await DestinationModel.deleteOne({ _id: id, account_id: accountId });
    return result.deletedCount === 1;
  }

  async searchDestinations(query: string, accountId: string): Promise<IDestination[]> {
    return await DestinationModel.find({
      account_id: accountId,
      url: { $regex: query, $options: "i" },
    });
  }
}
