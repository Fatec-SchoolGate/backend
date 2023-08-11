import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationDto } from './create-organization.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {
    @IsNotEmpty({ message: "missingId" })
    @IsUUID(null, { message: "missingId" })
    id: string;
}
