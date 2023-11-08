import { IsNotEmpty, IsUUID } from "class-validator";

export class InvalidateScheduleInviteDto {
    @IsUUID()
    @IsNotEmpty()
    inviteId: string;
}