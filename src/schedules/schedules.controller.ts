import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { GetScheduleDto } from './dto/get-schedule.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateScheduleInviteDto } from './dto/schedule-invite-dto';
import { InvalidateScheduleInviteDto } from './dto/invalidate-schedule-invite-dto';

@Controller('schedules')
@UseGuards(AuthGuard)
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post("/")
  async createSchedule(@Body() createScheduleDto: CreateScheduleDto, @Request() request) {
    const { user } = request;

    const schedule = await this.schedulesService.createSchedule(createScheduleDto, user);

    return { schedule };
  }

  @Get("/")
  async getSchedules(@Query() query: { subjectId?: string, organizationId?: string }, @Request() request) {
    const { user } = request;

    const { subjectId, organizationId } = query;

    if (!subjectId && !organizationId) throw new HttpException("noParamsPassed", HttpStatus.BAD_REQUEST);

    if (organizationId) {
      const schedules = await this.schedulesService.getSchedulesByOrganization(organizationId, user);

      return { schedules };
    } else {
      const schedules = await this.schedulesService.getSchedulesBySubject(subjectId);

      return { schedules };
    }
  }

  @Get("/:scheduleId")
  async getSchedule(@Param() params: { scheduleId: string }) {
    const { scheduleId } = params;

    const schedule = await this.schedulesService.getSchedule(scheduleId);

    return { schedule };
  }

  @Get("/:scheduleId/grouped-attendances")
  async getScheduleGroupedAttendances(@Param() params: { scheduleId: string }) {
    const { scheduleId } = params;
    
    const groupedAttendances = await this.schedulesService.getScheduleGroupedAttendances(scheduleId);

    return { groupedAttendances };
  }

  @Get("/:scheduleId/invites")
  public async getInvites(@Param() params: { scheduleId: string }) {
    const { scheduleId } = params;

    const invites = await this.schedulesService.getInvites(scheduleId);

    return { invites };
  }

  @Post("/accept-invite")
  public async acceptInvite(@Body() acceptInviteDto: InvalidateScheduleInviteDto, @Request() request) {
    const { user } = request;

    const { inviteId } = acceptInviteDto;

    await this.schedulesService.acceptInvite(inviteId, user); 

    return inviteId;
  }

  @Post("/create-invite")
  public async createInvite(@Body() createInviteDto: CreateScheduleInviteDto) {
    const { scheduleId } = createInviteDto;

    const invite = await this.schedulesService.createInvite(scheduleId);

    return invite;
  }

  @Post("/invalidate-invite")
  public async invalidateInvite(@Body() invalidateInviteDto: InvalidateScheduleInviteDto) {
    const { inviteId } = invalidateInviteDto;

    const invite = await this.schedulesService.invalidateInvite(inviteId);

    return invite;
  }

}
;