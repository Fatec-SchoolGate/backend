import { Module } from '@nestjs/common';
import { FaceRecognitionService } from './face-recognition.service';
import { FaceRecognitionController } from './face-recognition.controller';
import { SchedulesModule } from 'src/schedules/schedules.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { FaceRecognitionQueue } from './models/face-recognition-queue-model';
import { FirebaseStorageModule } from 'src/firebase_storage/firebase_storage.module';
import { FaceRecognitionQueuePhoto } from './models/face-recognition-queue-photo';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'face-recognition',
          type: 'direct'
        },
      ],
      uri: "amqp://localhost:5672",
      enableControllerDiscovery: true
    }),
    FirebaseStorageModule,
    SequelizeModule.forFeature([FaceRecognitionQueue, FaceRecognitionQueuePhoto]),
    SchedulesModule
  ],
  controllers: [FaceRecognitionController],
  providers: [FaceRecognitionService]
})
export class FaceRecognitionModule {}
