import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Schedule } from './schedule.modal';

@Module({
  imports: [SequelizeModule.forFeature([Schedule])],
  exports: [SequelizeModule.forFeature([Schedule])],
  controllers: [SchedulesController],
  providers: [SchedulesService]
})
export class SchedulesModule {}
