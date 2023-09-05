import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrganizationSubject } from './organization_subject.model';

@Module({
    imports: [SequelizeModule.forFeature([OrganizationSubject])],
    exports: [SequelizeModule.forFeature([OrganizationSubject])]
})
export class OrganizationSubjectModule {}
