import { Module } from '@nestjs/common';
import { ScheduleUsersService } from './schedule_users.service';
import { ScheduleUsersController } from './schedule_users.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { SchedulesModule } from 'src/schedules/schedules.module';

config();

@Module({
  imports: [
    CacheModule.register(),
    JwtModule.register({
      privateKey: process.env.JWT_ATTENDANCE_SECRET_KEY,
      signOptions: {
        expiresIn: "1d"
      }
    })
  ],
  controllers: [ScheduleUsersController],
  providers: [ScheduleUsersService]
})
export class ScheduleUsersModule {}
