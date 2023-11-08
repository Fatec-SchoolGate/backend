import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { AddMembersDto } from './dto/add-members-dto';
import { OrganizationUsersService } from './organization_users.service';
import { GetMembersDto } from './dto/get-members-dto';

@Controller('organization-users')
export class OrganizationUsersController {
    constructor(
        @Inject(OrganizationUsersService) private readonly organizationUserService: OrganizationUsersService
    ) { }

    @Get("/get-non-members/:organizationId")
    public async getNonMembers(@Param() params: { organizationId: string }) {
        const nonMembers = await this.organizationUserService.getNonMembers(params.organizationId);

        return { nonMembers };
    }

    @Get("/get-members/:organizationId")
    public async getMembers(@Param() params: GetMembersDto) {
        const users = await this.organizationUserService.getMembers(params.organizationId);

        return { users };
    }

    @Post("/add-members")
    public async addMembers(@Body() body: AddMembersDto) {
        const { members } = await this.organizationUserService.addMembers(body.organizationId, body.userIds);

        return {
            members
        };
    }

    @Delete("/:organizationId/remove-member/:userId")
    public async removeMember(@Param() params: { organizationId: string, userId: string }) {
        const { organizationId, userId } = params;
        
        await this.organizationUserService.removeMember(organizationId, userId);
    }
}
