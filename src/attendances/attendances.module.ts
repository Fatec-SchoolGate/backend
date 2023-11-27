import { Module } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { AttendancesController } from './attendances.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Attendance } from './attendance.model';
import { SchedulesModule } from 'src/schedules/schedules.module';
import { AttendancesRepository } from './attendances.repository';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FirebaseStorageModule } from 'src/firebase_storage/firebase_storage.module';

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
    FirebaseStorageModule,
    SchedulesModule
  ],
  controllers: [AttendancesController],
  providers: [AttendancesService, AttendancesRepository],
  exports: [AttendancesRepository]
})

export class AttendancesModule { }
