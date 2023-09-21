import { IsJWT, IsNotEmpty } from "class-validator";

export class ConfirmAttendanceDto {
    @IsNotEmpty()
    @IsJWT()
    attendanceToken: string;
}