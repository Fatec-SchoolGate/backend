import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { User } from './models/user.model';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) throw new UnauthorizedException();
    
    try {
      const user = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET_KEY });
      request["user"] = await this.getUser(user);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private async getUser(user) {
    if (!user?.sub) throw new UnauthorizedException();
    return await User.findOne({
      where: { id: user.sub }
    });
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];

    return type === "Bearer" ? token : undefined;
  }
}
