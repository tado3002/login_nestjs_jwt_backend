import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterUsersDto } from './dto/register-user.dto';
import { Users } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  async login(loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;
    const user = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) throw new NotFoundException('username or password invalid');

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword)
      throw new NotFoundException('username or password invalid');

    return {
      token: this.jwtService.sign({ username }),
    };
  }
  async register(createDto: RegisterUsersDto): Promise<any> {
    const createUsers = new Users();
    createUsers.username = createDto.username;
    createUsers.name = createDto.name;
    createUsers.email = createDto.email;
    createUsers.password = await bcrypt.hash(createDto.password, 10);

    const user = await this.usersService.createUser(createUsers);

    return {
      token: this.jwtService.sign({ username: user.username }),
    };
  }
}
