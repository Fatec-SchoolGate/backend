import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Organization } from './organization.model';
import { OrganizationUsersModule } from 'src/organization_users/organization_users.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Organization]),
    OrganizationUsersModule
  ],
  controllers: [OrganizationsController],
  providers: [OrganizationsService]
})
export class OrganizationsModule {}
