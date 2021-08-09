import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateJwt(user: UserDocument) {
    const { password, ...result } = user.toJSON();
    return await this.jwtService.signAsync(result);
  }
}
