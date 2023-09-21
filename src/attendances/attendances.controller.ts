import { Body, Controller, Param, Post, Request, Sse, UseGuards } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { Observable } from 'rxjs';
import { GenerateAttendanceTokenDto } from './dto/generate_attendance_token.dto';
import { ConfirmAttendanceDto } from './dto/check_attendance_token.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('attendances')
@UseGuards(AuthGuard)
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @Sse("generate-attendance-token-stream/:scheduleId")
  generateAttendanceToken(@Param() generateHashStreamDto: GenerateAttendanceTokenDto): Observable<any> {
    const { scheduleId } = generateHashStreamDto;
    return this.attendancesService.generateAttendanceToken(scheduleId);
  }

  @Post("confirm-attendance")
  async confirmAttendance(@Body() confirmAttendanceDto: ConfirmAttendanceDto, @Request() request) {
    const { attendanceToken } = confirmAttendanceDto;
    const { user } = request;
    await this.attendancesService.validateAttendanceToken(attendanceToken, user.id);
  }
}
