import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrganizationUser } from './organization_users.model';

@Module({
    imports: [SequelizeModule.forFeature([OrganizationUser])],
    exports: [SequelizeModule.forFeature([OrganizationUser])]
})
export class OrganizationUsersModule {}
