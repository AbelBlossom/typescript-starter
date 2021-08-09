import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Game, GameSchema } from 'src/schemas/game.schema';
import { Trans, TransSchema } from 'src/schemas/transaction.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Game.name, schema: GameSchema },
      { name: Trans.name, schema: TransSchema },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  // exports: [MongooseModule],
})
export class UsersModule {}
