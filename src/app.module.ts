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
import { AttendancesModule } from './attendances/attendances.module';
import { Attendance } from './attendances/attendance.model';
import { ScheduleUser } from './schedule_users/schedule-user.model';
import { ScheduleInvite } from './schedules/schedule-invite.modal';
import { FaceRecognitionModule } from './face-recognition/face-recognition.module';
import { FaceRecognitionQueue } from './face-recognition/models/face-recognition-queue-model';
import { FaceRecognitionQueuePhoto } from './face-recognition/models/face-recognition-queue-photo';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "files")
    }),
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
        ScheduleUser,
        ScheduleInvite,
        Attendance,
        FaceRecognitionQueue,
        FaceRecognitionQueuePhoto
      ]
    }),
    AuthModule,
    OrganizationsModule,
    OrganizationUsersModule,
    FirebaseStorageModule,
    SubjectModule,
    OrganizationSubjectModule,
    SchedulesModule,
    AttendancesModule,
    FaceRecognitionModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
