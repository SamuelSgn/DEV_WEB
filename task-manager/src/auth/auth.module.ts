import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET') ?? configService.get<string>('SECRET_KEY');
        const expiresIn = configService.get<string>('JWT_EXPIRES_IN') ?? '7d';

        if (!secret) {
          // Fail fast: auth must have a secret
          throw new Error('Missing JWT secret (JWT_SECRET/SECRET_KEY)');
        }

        return {
          secret,
          // `expiresIn` supports "7d" string values at runtime; cast to satisfy TS.
          signOptions: { expiresIn } as any,
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

