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
        OrganizationUser
      ]
    }),
    AuthModule,
    OrganizationsModule,
    OrganizationUsersModule,
    FirebaseStorageModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
