import { Module } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { AttendancesController } from './attendances.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Attendance } from './attendance.model';
import { SchedulesModule } from 'src/schedules/schedules.module';
import { AttendancesRepository } from './attendances.repository';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'foo',
          type: 'direct'
        },
      ],
      uri: "amqp://localhost:5672",
      enableControllerDiscovery: true
    }),
    SequelizeModule.forFeature([Attendance]),
    SchedulesModule
  ],
  controllers: [AttendancesController],
  providers: [AttendancesService, AttendancesRepository]
})

export class AttendancesModule { }
