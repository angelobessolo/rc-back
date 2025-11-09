import { CanActivate, ExecutionContext, Inject, Injectable, NotFoundException, UnauthorizedException, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly  authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No se encuentra token en la petición');
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        token,
        {
          secret: process.env.JWT_SECRET
        }
      );
      
      const user = await this.authService.getUserById(+payload.id)
      if (!user) throw new UnauthorizedException('Usuario no existe');
      if (!user.isActive) throw new UnauthorizedException('Usuario inactivo');

      request['user'] = user;
    } catch (error) {
      throw new UnauthorizedException('No se ha encontrado el token en la petición ó el usuario tiene credenciales invalidas, por favor comunicarse con el administrador del sistema');

    }
    
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
