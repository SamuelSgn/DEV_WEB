import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: (req) => {
        const auth = req.headers['authorization'];
        if (!auth) return null;
        const [type, token] = auth.split(' ');
        if (type !== 'Bearer') return null;
        return token;
      },
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') ?? configService.get<string>('SECRET_KEY'),
    });
  }

  async validate(payload: { sub: string; email: string }) {
    // Expose user identity to request handlers.
    return payload;
  }
}

