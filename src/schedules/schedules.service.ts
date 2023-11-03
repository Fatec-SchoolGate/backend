import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Schedule } from './schedule.modal';
import { Subject } from 'src/subject/subject.model';
import { Attendance } from 'src/attendances/attendance.model';
import { User } from 'src/auth/models/user.model';

@Injectable()
export class SchedulesService {
    constructor(
        @InjectModel(Schedule) private readonly schedule: typeof Schedule,
        @InjectModel(Attendance) private readonly attendance: typeof Attendance
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

    async getSchedule(scheduleId: string) {
        const schedule = await this.schedule.findOne({
            where: { id: scheduleId },
            include: [
                {
                    model: Subject
                }
            ]
        });

        return schedule;
    }

    async getScheduleGroupedAttendances(scheduleId: string) {
        const attendances = await this.attendance.findAll({
            where: {
                scheduleId
            },
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: [
                            "password"
                        ]
                    }
                }
            ]
        });

        const attendancesGroupedByDate: { [utcDate: string]: { attendances: Attendance[], users: User[] } } = {};

        for (let i = 0; i < attendances.length; i++) {
            const attendance = attendances[i];
            const date = new Date(Date.parse(attendance.createdAt));
            const utcDate = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`

            if (!attendancesGroupedByDate[utcDate]) {
                attendancesGroupedByDate[utcDate] = { attendances: [], users: [] };
            }

            //god                                                            plz forgive me
            const attendanceUser = attendance.user;
            attendanceUser.dataValues.attendedAt = attendance.createdAt;
            
            attendancesGroupedByDate[utcDate].attendances = [attendance, ...attendancesGroupedByDate[utcDate].attendances];
            attendancesGroupedByDate[utcDate].users = [attendanceUser, ...attendancesGroupedByDate[utcDate].users];
        }

        return attendancesGroupedByDate;
    }
}
