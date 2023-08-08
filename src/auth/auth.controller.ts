import { Body, Controller, Post, Put, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    
    constructor (private readonly authService: AuthService) {}
    
    @Post("signIn")
    async signIn(@Body() request: LoginDto) {
        const accessToken = await this.authService.signIn(request);
        
        return accessToken;
    }

    @Put("register")
    async register(@Body() request: CreateUserDto) {
        const { user, accessToken } = await this.authService.createUser(request);

        return {
            success: true,
            user,
            accessToken
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
