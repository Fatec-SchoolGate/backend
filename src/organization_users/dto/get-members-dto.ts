import { IsNotEmpty } from "class-validator";

export class GetMembersDto {
    @IsNotEmpty({ message: "noIdProvided" })
    organizationId: string;
}
