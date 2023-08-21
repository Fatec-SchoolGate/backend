import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { MinioClientModule } from 'src/minio-client/minio-client.module';

config()

@Module({
    imports: [
        PassportModule,
        SequelizeModule.forFeature([User]),
        MinioClientModule,
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
    exports: [AuthService, SequelizeModule]
})
export class AuthModule {}
