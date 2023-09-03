import { Test, TestingModule } from '@nestjs/testing';
import { SubjectService } from './subject.service';
import { SubjectModule } from './subject.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { Subject } from './subject.model';

describe('SubjectService', () => {
  let service: SubjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          dialect: "postgres",
          storage: ":memory:"
        }),
        JwtModule.register({ global: true }),
        SubjectModule
      ]
    }).compile();

    service = module.get<SubjectService>(SubjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("get subjects", () => {
    it("should return an array of subjects", () => {
      const subjects: Subject[] = [];

      jest.spyOn(service, "getSubjects").mockResolvedValue(subjects);

      console.log(subjects);
    });
  });  
});
