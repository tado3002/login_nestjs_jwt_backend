import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenBlacklistService } from './token-blacklist/token-blacklist.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly tokenBlacklistService: TokenBlacklistService) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new UnauthorizedException('No token found!');
    const token = authHeader.split(' ')[1];
    // Check if the token is blacklisted
    if (await this.tokenBlacklistService.isBlackListed(token))
      throw new UnauthorizedException('Token is blacklisted');
    return super.canActivate(context);
  }
  handleRequest<TUser = any>(err: any, user: any): TUser {
    if (err || !user) throw err || new UnauthorizedException();
    return user;
  }
}
