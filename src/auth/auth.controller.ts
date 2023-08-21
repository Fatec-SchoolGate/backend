import { Body, Controller, Get, Post, Put, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
    
    constructor (private readonly authService: AuthService) {}

    @Post("signIn")
    async signIn(@Body() request: LoginDto) {
        const accessToken = await this.authService.signIn(request);
        
        return accessToken;
    }

    @Put("register")
    @UseInterceptors(FileInterceptor("profileImage"))
    async register(@Body() request: CreateUserDto, @UploadedFile() profileImage: Express.Multer.File) {
        // const { user, accessToken } = await this.authService.createUser(request);
        this.authService.uploadProfileImage(profileImage);

        return {
            success: true,
            // user,
            // accessToken
        };
    }

    @UseGuards(AuthGuard)
    @Post("refresh-token")
    async refreshToken(@Request() request) {
        return {
            "test": true
        };
    }
}
