import { IsNotEmpty, IsUUID } from "class-validator";

export class GetSubjectsDto {
    @IsNotEmpty({ message: "provideOrganizationId" })
    @IsUUID(4, { message: "notUuid" })
    organizationId: string;
}