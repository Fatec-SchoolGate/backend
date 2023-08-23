import { IsNotEmpty, IsUUID } from "class-validator";

export class GetSubjectDto {
    @IsUUID(4, { message: "notUuid" })
    @IsNotEmpty({ message: "empty" })
    id: string;
}