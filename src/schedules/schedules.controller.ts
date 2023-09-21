import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { GetScheduleDto } from './dto/get-schedule.dto';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post("/")
  async createSchedule(@Body() createScheduleDto: CreateScheduleDto) {
    const schedule = await this.schedulesService.createSchedule(createScheduleDto);

    return { schedule };
  }

  @Get("/")
  async getSchedules(@Query() query: GetScheduleDto) {
    const { subjectId } = query;

    const schedules = await this.schedulesService.getSchedules(subjectId);

    return { schedules };
  }

}