import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class LoginDto {
    @IsNotEmpty({ message: "Email can't be empty" })
    @IsEmail({}, { message: "You must insert a valid email" })
    email: string;

    @Length(8, 255, { message: "Password has to be between 8 and 255 characters" })
    password: string;
}