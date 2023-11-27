import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { FirebaseStorageService } from 'src/firebase_storage/firebase_storage.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private firebaseStorageService: FirebaseStorageService,
    @InjectModel(User)
    private user: typeof User,
  ) {}
  
  public async createUser(createUserDto: CreateUserDto, profileImage: string) {
    if (await this.user.findOne({ where: { email: createUserDto.email } }) != null) throw new ConflictException("userExists");

    const user = await this.user.create<User>({ ...createUserDto, profileImage });
    delete user.password;
    
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      profileImage: user.profileImage,
      user
    });

    return {
      user,
      accessToken
    };
  }

  public async uploadProfileImage(profileImage: Express.Multer.File) {
    return await this.firebaseStorageService.uploadImage(profileImage);
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
        email: user.email,
        profileImage: user.profileImage,
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
