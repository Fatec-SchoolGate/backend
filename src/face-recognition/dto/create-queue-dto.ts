import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateQueueDto {
    @IsNotEmpty()
    @IsUUID("4")
    scheduleId: string;
}