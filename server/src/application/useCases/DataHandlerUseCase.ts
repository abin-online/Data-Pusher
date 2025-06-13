import { IDataHandlerUseCase } from "../../domain/usecases/IDataHandlerUseCase";
import { IDataHandlerRepository } from "../../domain/repositories/IDataHandlerRepository";
import { DataHandlerMessages } from "../../domain/messages/DataHandlerMessages";

export class DataHandlerUseCase implements IDataHandlerUseCase {
  constructor(private dataHandlerRepository: IDataHandlerRepository) {}

  async handleData(secretToken: string, eventId: string, data: any): Promise<any> {
    const isValid = await this.dataHandlerRepository.validateToken(secretToken);

    if (!isValid) {
      throw new Error(DataHandlerMessages.INVALID_TOKEN);
    }

    await this.dataHandlerRepository.saveEvent(eventId, data);

    return {
      success: true,
      message: DataHandlerMessages.SUCCESS,
    };
  }
}
