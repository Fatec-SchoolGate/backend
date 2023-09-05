import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Organization } from './organization.model';
import { OrganizationUser } from 'src/organization_users/organization_users.model';

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

    async createOrganization(createOrganizationDto: CreateOrganizationDto, userId: string) {
        const organization = await this.organization.create({
            ...createOrganizationDto,
            code: this.generateCode(createOrganizationDto.name)
        });

        const organizationUser = await this.organizationUser.create({
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
            where: { userId }
        }).then((organizationUsers) => organizationUsers.map((organizationUser) => organizationUser.organizationId));
        
        return await this.organization.findAll({
            where: { id: organizationIds }
        });
    }
}
