import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleUsersService } from './schedule_users.service';

describe('ScheduleUsersService', () => {
  let service: ScheduleUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleUsersService],
    }).compile();

    service = module.get<ScheduleUsersService>(ScheduleUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
