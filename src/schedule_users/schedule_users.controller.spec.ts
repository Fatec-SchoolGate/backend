import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleUsersController } from './schedule_users.controller';
import { ScheduleUsersService } from './schedule_users.service';

describe('ScheduleUsersController', () => {
  let controller: ScheduleUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleUsersController],
      providers: [ScheduleUsersService],
    }).compile();

    controller = module.get<ScheduleUsersController>(ScheduleUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
