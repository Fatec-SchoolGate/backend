import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Schedule } from './schedule.modal';
import { Attendance } from 'src/attendances/attendance.model';
import { ScheduleUsersModule } from 'src/schedule_users/schedule_users.module';
import { OrganizationSubjectModule } from 'src/organization_subject/organization_subject.module';
import { ScheduleInvite } from './schedule-invite.modal';
import { ScheduleInviteRepository } from './schedule-invite.repository';
import { Subject } from 'src/subject/subject.model';
import { Organization } from 'src/organizations/organization.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Schedule, Attendance, ScheduleInvite, Subject, Organization]),
    ScheduleUsersModule,
    OrganizationSubjectModule
  ],
  exports: [SequelizeModule.forFeature([Schedule])],
  controllers: [SchedulesController],
  providers: [ScheduleInviteRepository, SchedulesService]
})
export class SchedulesModule {}
