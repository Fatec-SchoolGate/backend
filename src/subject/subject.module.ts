import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subject } from './subject.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Subject])
  ],
  controllers: [SubjectController],
  providers: [SubjectService]
})
export class SubjectModule {}
