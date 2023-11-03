import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Schedule } from './schedule.modal';
import { Attendance } from 'src/attendances/attendance.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Schedule, Attendance]),
  ],
  exports: [SequelizeModule.forFeature([Schedule])],
  controllers: [SchedulesController],
  providers: [SchedulesService]
})
export class SchedulesModule {}
