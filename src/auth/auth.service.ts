import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  public createUser(createUserDto: CreateUserDto) {
    const user = this.usersService.userRepository.create(createUserDto);
    return this.usersService.userRepository.save(user);
  }

  public async signIn(loginDto: LoginDto) {
    const user = await this.usersService.userRepository.findOne({
      where: {
        email: loginDto.email
      }
    });
    
    if (!user) throw new UnauthorizedException();

    const matchPassword = await bcrypt.compare(loginDto.password, user.password);

    if (!matchPassword) throw new UnauthorizedException();

    return {
      access_token: await this.jwtService.signAsync({
        sub: user.id,
        email: user.email
      })
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
