import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { createCipheriv, createHash, randomBytes } from 'crypto';
import { concatMap, interval } from 'rxjs';
import { Attendance } from './attendance.model';
import { Schedule } from 'src/schedules/schedule.modal';
import { Op } from 'sequelize';
import { AttendancesRepository } from './attendances.repository';

@Injectable()
export class AttendancesService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(Attendance) private attendance: typeof Attendance,
        @InjectModel(Schedule) private schedule: typeof Schedule,
        @Inject(AttendancesRepository) private readonly attendanceRepository: AttendancesRepository
    ) { }

    public generateAttendanceToken(scheduleId: string) {
        return interval(5000).pipe(concatMap(async (_) => {
            const attendanceToken = await this.jwtService.signAsync({
                scheduleId
            });

            return { data: { attendanceToken } };
        }));
    }

    public async validateAttendanceToken(attendanceToken: string, userId: string) {
        try {
            const decodedAttendance = await this.jwtService.verifyAsync(attendanceToken, { secret: process.env.JWT_ATTENDANCE_SECRET_KEY });

            const { iat, exp, scheduleId } = decodedAttendance;
            const deltaTime = exp - iat;

            if (deltaTime !== 86400 || !scheduleId) throw new UnauthorizedException();

            const issuedAtDate = new Date(iat * 1000);
            const issuedAtHour = issuedAtDate.getHours();
            const issuedAtMinute = issuedAtDate.getMinutes();
            const issuedAtDay = issuedAtDate.getDay();

            const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
            const dayCondition = {};
            dayCondition[days[issuedAtDay]] = true;

            const attendanceTime = `${issuedAtHour}:${issuedAtMinute}:00`;

            const scheduleExists = await this.schedule.findOne({ where: { id: scheduleId } }) != null;

            if (!scheduleExists) throw new HttpException("SCHEDULE_DONT_EXIST", HttpStatus.FORBIDDEN);

            const schedule = await this.schedule.findOne({
                where: {
                    id: scheduleId,
                    startTime: {
                        [Op.lte]: attendanceTime
                    },
                    endTime: {
                        [Op.gte]: attendanceTime
                    },
                    ...dayCondition
                },
                raw: true
            });

            if (!schedule) throw new HttpException("SCHEDULE_TIME_RANGE_INVALID", HttpStatus.BAD_REQUEST);

            await this.attendanceRepository.create(userId, scheduleId, issuedAtDate);
        } catch (e) {
            throw e;
        }
    }

    // private encrypt(text: string) {

    //     const iv = randomBytes(16);
    //     const key = createHash("sha256").update(String("asdjklasdjkladskjkladsjlalkdjlaksd")).digest("base64").substring(0, 32);
    //     const cipher = createCipheriv("aes-256-cbc", key, iv);
    //     let encryptedText = cipher.update(text, "utf-8", "hex");
    //     encryptedText += cipher.final("hex");

    //     return encryptedText;
    // }
}
