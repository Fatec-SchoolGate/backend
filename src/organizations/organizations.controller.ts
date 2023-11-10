import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('organizations')
@UseGuards(AuthGuard)
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  async createOrganization(@Body() createOrganizationDto: CreateOrganizationDto, @Request() request) {
    const organization = await this.organizationsService.createOrganization(createOrganizationDto, request.user.id);

    return {
      organization
    };
  }

  @Get()
  async getOrganizations(@Request() { user }) {
    const organizations = await this.organizationsService.getOrganizations(user.id);

    return {
      organizations
    };
  }

  @Get("/:organizationId")
  public async getOrganization(@Param() params: { organizationId: string }, @Request() { user }) {
    const { organizationId } = params;

    const organization = await this.organizationsService.getOrganization(organizationId, user.id);

    return { organization };
  }
}
