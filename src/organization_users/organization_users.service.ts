import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrganizationUser, UserRoles } from './organization_users.model';
import { User } from 'src/auth/models/user.model';
import { Op } from 'sequelize';
import { OrganizationUsersValidationService } from './organization-users-validation.service';

@Injectable()
export class OrganizationUsersService {
    constructor(
        @InjectModel(OrganizationUser) private readonly organizationUser: typeof OrganizationUser,
        @InjectModel(User) private readonly user: typeof User,
        @Inject(OrganizationUsersValidationService) private readonly validationService: OrganizationUsersValidationService
    ) { }

    public async getMembers(organizationId: string) {
        const userIds = await this.organizationUser.findAll({
            attributes: ["userId"],
            where: {
                organizationId
            },
            raw: true
        }).then(organizationUsers => organizationUsers.map(organizationUser => organizationUser.userId));

        const users = await this.user.findAll({
            where: {
                id: userIds
            }
        });

        return users;
    }

    public async getNonMembers(organizationId: string) {
        const userIds = await this.organizationUser.findAll({
            attributes: ["userId"],
            where: {
                organizationId
            },
            raw: true
        }).then((organizationUsers) => organizationUsers.map(organizationUser => organizationUser.userId));

        const nonMembers = await this.user.findAll({
            where: {
                id: {
                    [Op.not]: userIds
                }
            },
            attributes: {
                exclude: ["password"]
            }
        });

        return nonMembers;
    }

    public async addMembers(organizationId: string, userIds: string[]) {
        const { validUserIds } = await this.validationService.addMembers(organizationId, userIds);
        
        const members = await this.organizationUser.bulkCreate(validUserIds.map((userId) => ({ organizationId, userId, role: "member" as UserRoles })), { ignoreDuplicates: true,  });

        return { members };
    }

    public async removeMember(organizationId: string, userId: string) {
        const organizationUser = await this.organizationUser.findOne({
            where: {
                userId,
                organizationId
            }
        });

        if (!organizationUser) throw new HttpException("organizationUserNotFound", HttpStatus.BAD_REQUEST);
        else if (organizationUser.role === "owner") throw new HttpException("cantRemoveOwner", HttpStatus.BAD_REQUEST);

        return await organizationUser.destroy();
    }
}
