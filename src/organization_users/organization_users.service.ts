import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrganizationUser } from './organization_users.model';
import { User } from 'src/auth/models/user.model';
import { Op } from 'sequelize';

@Injectable()
export class OrganizationUsersService {
    constructor(
        @InjectModel(OrganizationUser) private readonly organizationUser: typeof OrganizationUser,
        @InjectModel(User) private readonly user: typeof User
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

    public async addMember(organizationId: string, userIds: string[]) {
        for (let i = 0; i < userIds.length; i++) {
            await this.organizationUser.create({
                organizationId,
                userId: userIds[i]
            });
        }
    }
}
