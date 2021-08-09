import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    AdminsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/westake'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
