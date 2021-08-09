import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AdminsGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const user: User = context.switchToHttp().getRequest().user;

    const admin: string = user.roles.find((value) => value == 'admin');
    if (admin) {
      return true;
    }

    throw new UnauthorizedException();
  }
}
