import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Organization } from './organization.model';
import { OrganizationUser, UserRoles } from 'src/organization_users/organization_users.model';

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
}
