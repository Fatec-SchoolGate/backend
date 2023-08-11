import { Repository } from "typeorm";
import { Organization } from "./entities/organization.entity";
import { CreateOrganizationDto } from "./dto/create-organization.dto";

export class OrganizationsRepository extends Repository<Organization> {
    public findById(id: string) {
        return this.findOne({
            where: { id }
        });
    }

    public all() {
        return this.find();
    }

    public createOrganization(organizationDto: CreateOrganizationDto) {
        return this.find();
        const entity = this.create(organizationDto);
        return this.save(entity);
    }
}