import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrganizationUser } from './organization_users.model';
import { OrganizationUsersController } from './organization_users.controller';
import { OrganizationUsersService } from './organization_users.service';
import { AuthModule } from 'src/auth/auth.module';
import { OrganizationUsersValidationService } from './organization-users-validation.service';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { Organization } from 'src/organizations/organization.model';

@Module({
    imports: [
        SequelizeModule.forFeature([OrganizationUser]),
        SequelizeModule.forFeature([Organization]),
        AuthModule
    ],
    exports: [SequelizeModule.forFeature([OrganizationUser])],
    controllers: [OrganizationUsersController],
    providers: [OrganizationUsersService, OrganizationUsersValidationService]
})
export class OrganizationUsersModule { }
