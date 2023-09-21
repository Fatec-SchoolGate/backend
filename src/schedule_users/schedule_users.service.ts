import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { concatMap, interval, map } from 'rxjs';
import crypto, { createCipheriv, createHash, randomBytes } from "crypto";
import { InjectModel } from '@nestjs/sequelize';
import { Schedule } from 'src/schedules/schedule.modal';

@Injectable()
export class ScheduleUsersService {
    constructor(
        private readonly jwtService: JwtService
    ) {}

    public generateAttendanceToken(scheduleId: string) {
        return interval(5000).pipe(concatMap(async (_) => {
            const attendanceToken = await this.jwtService.signAsync({
                scheduleId
            });
            const foo = this.encrypt(attendanceToken);
            return { data: { attendanceToken, foo } };
        }));
    }

    public async validateAttendanceToken(attendanceToken: string) {
        try {
            const decodedAttendance = await this.jwtService.verifyAsync(attendanceToken, { secret: process.env.JWT_ATTENDANCE_SECRET_KEY });

            const { iat, exp, scheduleId } = decodedAttendance;
            const deltaTime = exp - iat;
            if (deltaTime !== 86400 || !scheduleId) throw new UnauthorizedException();

            // const schedule = this.schedule
        } catch {
            throw new UnauthorizedException();
        }
    }

    private encrypt(text: string) {
        
        const iv = randomBytes(16);
        const key = createHash("sha256").update(String("asdjklasdjkladskjkladsjlalkdjlaksd")).digest("base64").substring(0, 32);
        const cipher = createCipheriv("aes-256-cbc", key, iv);
        let encryptedText = cipher.update(text, "utf-8", "hex");
        encryptedText += cipher.final("hex");

        return encryptedText;
    }
}
