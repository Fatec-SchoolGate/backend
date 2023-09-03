import { Test } from '@nestjs/testing';
import { SubjectController } from './subject.controller';
import { SubjectModule } from './subject.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subject } from './subject.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SubjectService } from './subject.service';

describe('SubjectController', () => {
  let subjectController: SubjectController;
  let subjectService: SubjectService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          dialect: "postgres",
          storage: ":memory:"
        }),
        JwtModule.register({
          global: true
        }),
        SubjectModule
      ]
    }).compile();

    subjectController = module.get<SubjectController>(SubjectController);
    subjectService = module.get<SubjectService>(SubjectService);
  });

  it("should be defined", () => {
    expect(subjectController).toBeDefined();
    expect(subjectService).toBeDefined();
  });
});
