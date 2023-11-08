import { Module } from '@nestjs/common';
import { ScheduleUsersService } from './schedule_users.service';
import { ScheduleUsersController } from './schedule_users.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { SchedulesModule } from 'src/schedules/schedules.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ScheduleUser } from './schedule-user.model';

config();

@Module({
  imports: [
    SequelizeModule.forFeature([ScheduleUser]),
    CacheModule.register(),
    JwtModule.register({
      privateKey: process.env.JWT_ATTENDANCE_SECRET_KEY,
      signOptions: {
        expiresIn: "1d"
      }
    })
  ],
  exports: [
    SequelizeModule.forFeature([ScheduleUser])
  ],
  controllers: [ScheduleUsersController],
  providers: [ScheduleUsersService]
})
export class ScheduleUsersModule {}
