import { IsNotEmpty } from "class-validator";

export class CreateOrganizationDto {
    @IsNotEmpty({
        message: "emptyOrganizationName"
    })
    name: string;
    
    description: string;

    @IsNotEmpty({
        message: "emptyOrganizationAddress"
    })
    address: string;
}