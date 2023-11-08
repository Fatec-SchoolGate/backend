import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateScheduleInviteDto {
    @IsUUID()
    @IsNotEmpty()
    scheduleId: string;
}