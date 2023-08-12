import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  async createOrganization(@Body() createOrganizationDto: CreateOrganizationDto) {
    const organization = await this.organizationsService.createOrganization(createOrganizationDto);

    return {
      organization
    };
  }

  @Get()
  async getOrganizations() {
    const organizations = await this.organizationsService.getOrganizations();

    return {
      organizations
    };
  }
}
