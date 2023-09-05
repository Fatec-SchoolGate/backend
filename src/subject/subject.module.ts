import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subject } from './subject.model';
import { OrganizationSubjectModule } from 'src/organization_subject/organization_subject.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Subject]),
    OrganizationSubjectModule
  ],
  controllers: [SubjectController],
  providers: [SubjectService]
})
export class SubjectModule {}
