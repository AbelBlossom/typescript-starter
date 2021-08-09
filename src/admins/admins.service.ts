import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, GameDocument } from 'src/schemas/game.schema';
import { GameUpdateDto } from './admins.dto';

@Injectable()
export class AdminsService {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {}

  async createGame(game: Game): Promise<GameDocument> {
    try {
      return await this.gameModel.create(game);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateGame(id: string, obj: GameUpdateDto): Promise<GameDocument> {
    const game = await this.gameModel.findById(id);
    if (!game) throw new NotFoundException();
    await game.updateOne({ ...obj });
    return await this.gameModel.findById(id);
  }

  async getGames(): Promise<GameDocument[]> {
    return await this.gameModel.find().limit(10);
  }

  async deleteGame(id: string) {
    const game = await this.gameModel.findById(id);
    if (!game) throw new NotFoundException();
    await game.delete();
    return {
      deleted: true,
    };
  }
}
