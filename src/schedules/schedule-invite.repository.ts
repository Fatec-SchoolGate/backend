import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Organization } from "src/organizations/organization.model";
import { ScheduleInvite } from "./schedule-invite.modal";
import { Schedule } from "./schedule.modal";
import { Subject } from "src/subject/subject.model";
import { OrganizationSubject } from "src/organization_subject/organization_subject.model";

@Injectable()
export class ScheduleInviteRepository {
    constructor(
        @InjectModel(ScheduleInvite) private readonly invite: typeof ScheduleInvite,
        @InjectModel(Schedule) private readonly schedule: typeof Schedule,
        @InjectModel(Subject) private readonly subject: typeof Subject,
        @InjectModel(OrganizationSubject) private readonly organizationSubject: typeof OrganizationSubject,
        @InjectModel(Organization) private readonly organization: typeof Organization
    ) {}

    public async findById(inviteId: string) {
        const invite = await this.invite.findOne({
            where: { id: inviteId },
            include: [
                {
                    model: Schedule,
                    include: [
                        {
                            model: Subject
                        }
                    ]
                }
            ]
        });

        return invite;
    }

    public async inviteSchedule(inviteId: string) {
        const invite = await this.findById(inviteId);

        if (!invite) return null;

        return invite.schedule;
    }

    public async inviteOrganization(inviteId: string): Promise<Organization | null> {
        const schedule = await this.inviteSchedule(inviteId);

        if (!schedule) return null;

        const subject = schedule.subject;

        if (!subject) return null;

        const organizationId = await this.organizationSubject.findOne({
            where: {
                subjectId: subject.id
            },
            raw: true
        }).then((relation) => relation.organizationId);

        if (!organizationId) return null;

        const organization = await this.organization.findOne({
            where: {
                id: organizationId
            }
        });

        return organization;
    }
}