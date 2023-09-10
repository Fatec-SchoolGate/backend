import { IsNotEmpty, IsUUID } from "class-validator";

export class GetScheduleDto {
    @IsNotEmpty()
    @IsUUID()
    subjectId: string;
}