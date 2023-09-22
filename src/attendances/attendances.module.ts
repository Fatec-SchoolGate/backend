import { Module } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { AttendancesController } from './attendances.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Attendance } from './attendance.model';
import { SchedulesModule } from 'src/schedules/schedules.module';
import { AttendancesRepository } from './attendances.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([Attendance]),
    SchedulesModule
  ],
  controllers: [AttendancesController],
  providers: [AttendancesService, AttendancesRepository]
})

export class AttendancesModule { }
