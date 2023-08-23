import { IsMimeType, IsNotEmpty, IsString } from "class-validator";

export class CreateSubjectDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    displayImage: string;
    backgroundImage: string;
}