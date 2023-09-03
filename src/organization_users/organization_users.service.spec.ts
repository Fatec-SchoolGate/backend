import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationUsersService } from './organization_users.service';
import { SequelizeModule } from '@nestjs/sequelize';

describe('OrganizationUsersService', () => {
  let service: OrganizationUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          dialect: "postgres",
          storage: ":memory:"
        })
      ],
      providers: [OrganizationUsersService],
    }).compile();

    service = module.get<OrganizationUsersService>(OrganizationUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
