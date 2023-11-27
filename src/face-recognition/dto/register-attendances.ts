import { IsArray, IsNotEmpty, IsUUID } from "class-validator";

export class RegisterAttendancesDto {
    @IsNotEmpty()
    @IsUUID("4")
    scheduleId: string;

    @IsNotEmpty()
    @IsArray()
    userIds: string[];
}