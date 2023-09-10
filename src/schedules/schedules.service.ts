import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Schedule } from './schedule.modal';

@Injectable()
export class SchedulesService {
    constructor(
        @InjectModel(Schedule) private readonly schedule: typeof Schedule
    ) {}

    async createSchedule(createScheduleDto: CreateScheduleDto) {
        const schedule = await this.schedule.create({ ...createScheduleDto, name: "", description: "" });

        return schedule;
    }

    async getSchedules(subjectId: string) {
        const schedules = await this.schedule.findAll({
            where: { subjectId }
        });
        
        return schedules;
    }
}
