import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, Request, Sse, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { Observable } from 'rxjs';
import { GenerateAttendanceTokenDto } from './dto/generate_attendance_token.dto';
import { ConfirmAttendanceDto } from './dto/check_attendance_token.dto';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('attendances')
@UseGuards(AuthGuard)
export class AttendancesController {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly attendancesService: AttendancesService
  ) {}

  @Sse("generate-attendance-token-stream/:scheduleId")
  generateAttendanceToken(@Param() generateHashStreamDto: GenerateAttendanceTokenDto): Observable<any> {
    const { scheduleId } = generateHashStreamDto;
    return this.attendancesService.generateAttendanceToken(scheduleId);
  }

  @Post("confirm-attendance")
  async confirmAttendance(@Body() confirmAttendanceDto: ConfirmAttendanceDto, @Request() request) {
    const { attendanceToken } = confirmAttendanceDto;
    const { user } = request;
    const attendance = await this.attendancesService.validateAttendanceToken(attendanceToken, user.id);

    return { attendance };
  }

  @Get("attendances-by-user")
  public async getAttendancesByUser(@Request() { user }, @Query() query: { scheduleId?: string }) {
    const { scheduleId } = query;

    const attendances = await this.attendancesService.getAttendancesByUser(user, scheduleId);

    return attendances;
  }

  @Post("confirm-attendance-with-photo")
  @UseInterceptors(FilesInterceptor("photos"))
  async confirmAttendanceWithPhoto(@UploadedFiles() photos: Express.Multer.File[]) {
    await this.attendancesService.confirmAttendanceWithPhoto(photos);
  }

  @Post("recognize-faces")
  async recognizeFaces() {
    console.log("teste");
    this.amqpConnection.publish("foo", "foo3", {
      message: "vim ado nestjas"
    })
  }

  @RabbitSubscribe({
    queue: "foo2",
    routingKey: "foo",
    exchange: "foo",
    allowNonJsonMessages: true
  })
  async teste() {
  console.log("received a message from python service hehe :)");
  }

}
