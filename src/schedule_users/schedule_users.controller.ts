import { Body, Controller, Param, Post, Sse } from '@nestjs/common';
import { ScheduleUsersService } from './schedule_users.service';
import { Observable } from 'rxjs';
import { GenerateAttendanceTokenDto } from './dto/generate_attendance_token.dto';
import { ConfirmAttendanceDto } from './dto/check_attendance_token.dto';

@Controller('schedule-users')
export class ScheduleUsersController {
  constructor(private readonly scheduleUsersService: ScheduleUsersService) {}

  @Sse("generate-attendance-token-stream/:scheduleId")
  generateAttendanceToken(@Param() generateHashStreamDto: GenerateAttendanceTokenDto): Observable<any> {
    const { scheduleId } = generateHashStreamDto;
    return this.scheduleUsersService.generateAttendanceToken(scheduleId);
  }

  @Post("confirm-attendance")
  confirmAttendance(@Body() confirmAttendanceDto: ConfirmAttendanceDto) {
    const { attendanceToken } = confirmAttendanceDto;

    this.scheduleUsersService.validateAttendanceToken(attendanceToken);
  }
}
