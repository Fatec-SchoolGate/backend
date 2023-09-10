import { IsBoolean, IsNotEmpty, IsUUID, Matches } from "class-validator";

export class CreateScheduleDto {
    @IsNotEmpty()
    @Matches(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
    startTime: string;

    @IsNotEmpty()
    @Matches(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
    endTime: string;

    @IsNotEmpty()
    @IsUUID("4")
    subjectId: string;

    @IsNotEmpty()
    @IsBoolean()
    monday: boolean;
    
    @IsNotEmpty()
    @IsBoolean()
    tuesday: boolean;

    @IsNotEmpty()
    @IsBoolean()
    wednesday: boolean;

    @IsNotEmpty()
    @IsBoolean()
    thursday: boolean;

    @IsNotEmpty()
    @IsBoolean()
    friday: boolean;

    @IsNotEmpty()
    @IsBoolean()
    saturday: boolean;

    @IsNotEmpty()
    @IsBoolean()
    sunday: boolean;


}