import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Attendance } from "./attendance.model";
import { Op } from "sequelize";

@Injectable()
export class AttendancesRepository {
    constructor(
        @InjectModel(Attendance) private readonly attendance: typeof Attendance
    ) { }

    public async create(userId: string, scheduleId: string, attendanceDate: Date) {
        if (await this.hasUserAttendedTodayForSubject(userId, scheduleId)) return false;

        const weekDayIndex = attendanceDate.getDay();
        const attendance = await this.attendance.create({
            userId,
            scheduleId,
            attendanceDate,
            weekDayIndex,
            authMode: "manual"
        });

        return attendance;
    }

    public async byUserId(userId: string, scheduleId?: string) {
        return await this.attendance.findAll({
            where: { userId, ...(scheduleId && { scheduleId }) }
        });
    }

    public async hasUserAttendedTodayForSubject(userId: string, scheduleId: string) {
        const todayStart = new Date().setHours(0, 0, 0, 0);
        const now = new Date();

        return (await this.attendance.findAll({
            where: {
                userId,
                scheduleId,
                attendanceDate: {
                    [Op.gte]: todayStart,
                    [Op.lte]: now
                }
            },
            raw: true
        })).length > 0;
    }
}

