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
        
        console.log({
            orgnaizationId: organization.id,
            userId
        });

        const organizationUser = await this.organizationUser.create({
            organizationId: organization.id,
            userId
        });

        console.log(organizationUser.organization);

        return organization;
    }

    async getOrganizations() {
        return await this.organization.findAll();
    }
}
