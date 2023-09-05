import { IsMimeType, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateSubjectDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    @IsUUID("4")
    organizationId: string;

    displayImage: string;
    backgroundImage: string;
}