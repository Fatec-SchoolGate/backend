import { IsNotEmpty } from "class-validator";

export class CreateOrganizationDto {
    @IsNotEmpty({ message: "enterOrganizationName" })
    name: string;

    address: string;
}
