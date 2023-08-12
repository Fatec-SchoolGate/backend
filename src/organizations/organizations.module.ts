import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Organization } from './organization.model';

@Module({
  imports: [SequelizeModule.forFeature([Organization])],
  controllers: [OrganizationsController],
  providers: [OrganizationsService]
})
export class OrganizationsModule {}
