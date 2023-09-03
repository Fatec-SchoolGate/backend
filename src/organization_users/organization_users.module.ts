import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrganizationUser } from './organization_users.model';
import { OrganizationUsersController } from './organization_users.controller';
import { OrganizationUsersService } from './organization_users.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        SequelizeModule.forFeature([OrganizationUser]),
        AuthModule
    ],
    exports: [SequelizeModule.forFeature([OrganizationUser])],
    controllers: [OrganizationUsersController],
    providers: [OrganizationUsersService]
})
export class OrganizationUsersModule { }
