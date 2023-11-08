import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/auth/models/user.model";
import { OrganizationUser } from "./organization_users.model";
import { Organization } from "src/organizations/organization.model";
import { Op } from "sequelize";

@Injectable()
export class OrganizationUsersValidationService {

    constructor (
        @InjectModel(OrganizationUser) private readonly organizationUser: typeof OrganizationUser,
        @InjectModel(Organization) private readonly organization: typeof Organization,
        @InjectModel(User) private readonly user: typeof User,
    ) {}

    public async addMembers(organizationId: string, userIds: string[]) {
        const organization = await this.organization.findOne({
            where: { id: organizationId }
        });

        if (!organization) throw new HttpException("organization_not_found", HttpStatus.BAD_REQUEST);

        const memberIds = await this.organizationUser.findAll({
            where: {
                organizationId
            },
            raw: true
        }).then((members) => members.map((member) => member.userId));
        
        //getting users that are in the array passed and that are not in the organization already
        const validUserIds = await this.user.findAll({
            where: {
                id: {
                    [Op.and]: {
                        [Op.not]: memberIds,
                        [Op.in]: userIds
                    }
                }
            },
            raw: true
        }).then((users) => users.map((user) => user.id));

        return {
            validUserIds
        };
    }
}