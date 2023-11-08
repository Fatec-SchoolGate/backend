import { Inject, Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Schedule } from './schedule.modal';
import { Subject } from 'src/subject/subject.model';
import { Attendance } from 'src/attendances/attendance.model';
import { User } from 'src/auth/models/user.model';
import { ScheduleUser } from 'src/schedule_users/schedule-user.model';
import { OrganizationSubject } from 'src/organization_subject/organization_subject.model';
import { ScheduleInvite } from './schedule-invite.modal';

@Injectable()
export class SchedulesService {
    constructor(
        @InjectModel(Schedule) private readonly schedule: typeof Schedule,
        @InjectModel(Attendance) private readonly attendance: typeof Attendance,
        @InjectModel(ScheduleUser) private readonly scheduleUser: typeof ScheduleUser,
        @InjectModel(OrganizationSubject) private readonly organizationSubject: typeof OrganizationSubject,
        @InjectModel(ScheduleInvite) private readonly invite: typeof ScheduleInvite
    ) {}

    public async getInvites(scheduleId: string) {
        const invites = await this.invite.findAll({
            where: {
                scheduleId
            }
        });

        return invites;
    }

    public async createInvite(scheduleId: string) {
        const invite = await this.invite.create({
            scheduleId
        });

        return invite;
    }

    public async invalidateInvite(inviteId: string) {
        const invite = await this.invite.findOne({
            where: {
                id: inviteId
            }
        });

        invite.destroy();

        return invite;
    }

    async createSchedule(createScheduleDto: CreateScheduleDto, user: User) {
        const schedule = await this.schedule.create({ ...createScheduleDto, name: "", description: "" });

        const scheduleUser = await this.scheduleUser.create({ scheduleId: schedule.id, userId: user.id });

        return schedule;
    }

    async getSchedulesBySubject(subjectId: string) {
        const schedules = await this.schedule.findAll({
            where: { subjectId }
        });
        
        return schedules;
    }

    public async getSchedulesByOrganization(organizationId: string, user: User) {
        const subjectIds = await this.organizationSubject.findAll({
            where: {
                organizationId
            }
        }).then((organizationSubjects) => organizationSubjects.map((organizationSubject) => organizationSubject.subjectId));

        const scheduleUserIds = await this.scheduleUser.findAll({
            where: { userId: user.id },
            raw: true
        }).then((scheduleUsers) => scheduleUsers.map((scheduleUser) => scheduleUser.scheduleId));

        const schedules = await this.schedule.findAll({
            where: {
                subjectId: subjectIds,
                id: scheduleUserIds
            },
            include: [
                {
                    model: ScheduleUser
                }
            ]
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
