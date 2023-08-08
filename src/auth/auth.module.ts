import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';

config()

@Module({
    imports: [
        UsersModule,
        PassportModule,
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            global: true,
            privateKey: process.env.JWT_SECRET_KEY,
            signOptions: {
                expiresIn: "12h"
            }
        })
    ],
    providers: [AuthService, LocalStrategy],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
