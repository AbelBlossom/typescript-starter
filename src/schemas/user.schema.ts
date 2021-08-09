import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, Min } from 'class-validator';

export type UserDocument = User & Document;
@Schema()
export class User {
  @ApiProperty()
  @IsNotEmpty()
  @Prop()
  firstname: string;

  @ApiProperty()
  @IsNotEmpty()
  @Prop()
  lastname: string;

  @Prop()
  balance: number;

  @ApiProperty()
  @IsEmail()
  @Prop()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Prop()
  password: string;

  @ApiProperty()
  @IsPhoneNumber('GH')
  @Prop()
  phone: string;

  @Prop()
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre<UserDocument>('save', function (next) {
  if (!this.isModified('password')) return next();

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;

  return next();
});
