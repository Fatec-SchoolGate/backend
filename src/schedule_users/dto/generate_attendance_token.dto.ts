import { IsNotEmpty, IsUUID } from "class-validator";

export class GenerateAttendanceTokenDto {
    @IsNotEmpty()
    @IsUUID()
    scheduleId: string;
}