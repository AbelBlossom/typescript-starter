import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Request } from 'express';

export class LoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class UserUpdateDto extends PartialType(User) {}

export interface RequestDto extends Request {
  user?: UserDocument;
}
