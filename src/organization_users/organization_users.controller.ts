import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { AddMembersDto } from './dto/add-members-dto';
import { OrganizationUsersService } from './organization_users.service';
import { GetMembersDto } from './dto/get-members-dto';

@Controller('organization-users')
export class OrganizationUsersController {
    constructor(
        @Inject(OrganizationUsersService) private readonly organizationService: OrganizationUsersService
    ) { }

    @Get("/get-members/:organizationId")
    public async getMembers(@Param() params: GetMembersDto) {
        const users = await this.organizationService.getMembers(params.organizationId);

        return { users };
    }

    @Post("/add-members")
    public async addMember(@Body() body: AddMembersDto) {
        await this.organizationService.addMember(body.organizationId, body.userIds);
    }
}
