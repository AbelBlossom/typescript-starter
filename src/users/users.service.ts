import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UserUpdateDto } from './users.dto';
import { Game, GameDocument } from 'src/schemas/game.schema';
import { Trans, TransDocument } from 'src/schemas/transaction.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Game.name) private gameModel: Model<GameDocument>,
    @InjectModel(Trans.name) private transModel: Model<TransDocument>,
    private authServive: AuthService,
  ) {}

  async login(email: string, password: string) {
    const _temp = await this.findByEmail(email);
    if (!_temp) throw new BadRequestException();

    if (bcrypt.compareSync(password, _temp.password)) {
      const token = await this.authServive.generateJwt(_temp);

      return { token, ..._temp.toJSON() };
    } else {
      throw new BadRequestException();
    }
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ email: { $eq: email } });
    if (user) {
      return user;
    }

    return null;
  }

  async register(user: User) {
    user.balance = 0;
    return await this.userModel.create(user);
  }

  async getAllUsers() {
    return await this.userModel.find();
  }

  async update(id: string, obj: UserUpdateDto) {
    const _user = await this.userModel.findById(id);
    await _user.update(obj);
    return await this.userModel.findById(id);
  }

  async getGames(): Promise<GameDocument[]> {
    const _handler = new Date().toLocaleDateString();
    try {
      return await this.gameModel.find({ handler: { $eq: _handler } });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async addTransaction(trans: Trans) {
    try {
      return await this.transModel.create(trans);
    } catch (error) {
      throw new HttpException(
        'Unable to create transaction',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async updateTransactionData(
    { id, user }: { id: string; user: string },
    data: string,
  ) {
    try {
      await this.transModel.findOneAndUpdate(
        {
          user: user,
          id: id,
        },
        {
          data,
        },
      );
    } catch (e) {
      throw new ForbiddenException();
    }
  }

  async getTransactions(user: string) {
    try {
      return await this.transModel.find({ user });
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
