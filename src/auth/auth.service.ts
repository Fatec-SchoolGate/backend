import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { BufferedFile } from 'src/minio-client/file.model';
import { MinioClientService } from 'src/minio-client/minio-client.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private minioService: MinioClientService,
    @InjectModel(User)
    private user: typeof User,
  ) {}
  
  public async createUser(createUserDto: CreateUserDto) {
    if (await this.user.findOne({ where: { email: createUserDto.email } }) != null) throw new ConflictException("userExists");

    const user = await this.user.create<User>({ ...createUserDto });
  
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email
    });

    return {
      user,
      accessToken
    };
  }

  public async uploadProfileImage(profileImage: BufferedFile) {
    const profileImagePath = this.minioService.upload(profileImage);
    console.log(profileImagePath);
  }

  public async signIn(loginDto: LoginDto) {
    const user = await this.user.findOne({
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

  async validateUser(name: string, pass: string): Promise<any> {
    const user = await this.user.findOne({
      where: { name }
    });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
