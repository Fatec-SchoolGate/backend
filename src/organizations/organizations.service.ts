import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Organization } from './organization.model';
import { OrganizationUser, UserRoles } from 'src/organization_users/organization_users.model';
import { OrganizationSubject } from 'src/organization_subject/organization_subject.model';
import { Subject } from 'src/subject/subject.model';
import { Schedule } from 'src/schedules/schedule.modal';
import { User } from 'src/auth/models/user.model';

@Injectable()
export class OrganizationsService {
    constructor(
        @InjectModel(Organization)
        private organization: typeof Organization,
        @InjectModel(OrganizationUser)
        private organizationUser: typeof OrganizationUser,
    ) {}

    private generateCode(organizationName: string) {
        return organizationName;
    }

    private async validateOrganization(createOrganizationDto: CreateOrganizationDto) {
        const organization = await this.organization.findOne({
            where: {
                name: createOrganizationDto.name
            }
        });

        if (organization != null) throw new HttpException("organization_already_exists", HttpStatus.BAD_REQUEST);
    }

    private getRoleFromOrganization(organization: Organization, userId: string): UserRoles {
        if (!organization.organizationUsers) throw new Error();

        const organizationUser = organization.organizationUsers.find((organizationUser) => organizationUser.userId === userId);

        return organizationUser ? organizationUser.role as UserRoles : "member";
    }

    async createOrganization(createOrganizationDto: CreateOrganizationDto, userId: string) {
        await this.validateOrganization(createOrganizationDto);

        const organization = await this.organization.create({
            ...createOrganizationDto,
            code: this.generateCode(createOrganizationDto.name)
        });

        await this.organizationUser.create({
            organizationId: organization.id,
            userId,
            role: "owner"
        });

        return organization;
    }

    async getOrganizations(userId: string) {
        const organizationIds = await this.organizationUser.findAll({
            raw: true,
            attributes: ["organizationId"],
            where: { userId },
        }).then((organizationUsers) => organizationUsers.map((organizationUser) => organizationUser.organizationId));
        
        const organizations = await this.organization.findAll({
            where: { id: organizationIds },
            include: [
                { model: OrganizationUser }
            ]
        });

        const organizationsWithRole = organizations.map((organization) => {
            organization.dataValues.userRole = this.getRoleFromOrganization(organization, userId);

            delete organization.dataValues.organizationUsers;

            return organization;
        });

        return organizationsWithRole;
    }

    private extractSchedulesFromOrganization(organization: Organization): Schedule[] {
        const organizationSubjects = organization.organizationSubjects;

        const subjects = organizationSubjects.map((organizationSubject) => organizationSubject.subject);

        const schedules = subjects.map((subject) => subject.schedules).flat();

        return schedules;
    }

    public async getOrganization(organizationId: string, userId: string) {
        const organizationUser = await this.organizationUser.findOne({
            where: {
                userId,
                organizationId
            }
        });

        if (!organizationUser) throw new HttpException("noPermission", HttpStatus.FORBIDDEN);
        
        const organization = await this.organization.findOne({
            where: { id: organizationId },
            include: [
                {
                    model: OrganizationSubject,
                    include: [
                        {
                            model: Subject,
                            include: [
                                {
                                    model: Schedule
                                }
                            ]
                        }
                    ]
                },
                { model: OrganizationUser }
            ]
        });

        organization.dataValues.schedules = this.extractSchedulesFromOrganization(organization);
        organization.dataValues.userRole = organizationUser.role;

        return organization;
    }
}
