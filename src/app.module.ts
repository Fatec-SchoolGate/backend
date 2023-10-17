import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/models/user.model';
import { OrganizationsModule } from './organizations/organizations.module';
import { Organization } from './organizations/organization.model';
import { OrganizationUsersModule } from './organization_users/organization_users.module';
import { OrganizationUser } from './organization_users/organization_users.model';
import { FirebaseStorageModule } from './firebase_storage/firebase_storage.module';
import { SubjectModule } from './subject/subject.module';
import { Subject } from './subject/subject.model';
import { OrganizationSubjectModule } from './organization_subject/organization_subject.module';
import { OrganizationSubject } from './organization_subject/organization_subject.model';
import { SchedulesModule } from './schedules/schedules.module';
import { Schedule } from './schedules/schedule.modal';
import { ScheduleUsersModule } from './schedule_users/schedule_users.module';
import { AttendancesModule } from './attendances/attendances.module';
import { Attendance } from './attendances/attendance.model';
import { FaceRecognitionQueuesModule } from './face_recognition_queues/face_recognition_queues.module';
import { FaceRecognitionQueuePhotosModule } from './face_recognition_queue_photos/face_recognition_queue_photos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      sync: {
        force: true
      },
      models: [
        User,
        Organization,
        OrganizationUser,
        Subject,
        OrganizationSubject,
        Schedule,
        Attendance
      ]
    }),
    AuthModule,
    OrganizationsModule,
    OrganizationUsersModule,
    FirebaseStorageModule,
    SubjectModule,
    OrganizationSubjectModule,
    SchedulesModule,
    ScheduleUsersModule,
    AttendancesModule,
    FaceRecognitionQueuesModule,
    FaceRecognitionQueuePhotosModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
