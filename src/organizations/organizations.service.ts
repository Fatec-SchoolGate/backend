import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Organization } from './organization.model';

@Injectable()
export class OrganizationsService {
    constructor(
        @InjectModel(Organization)
        private organization: typeof Organization
    ) {}

    async createOrganization(createOrganizationDto: CreateOrganizationDto) {
        const organization = await this.organization.create({
            ...createOrganizationDto,
            code: "teste"
        });

        return organization;
    }

    async getOrganizations() {
        return await this.organization.findAll();
    }
}
