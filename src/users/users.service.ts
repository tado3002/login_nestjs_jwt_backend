import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Users } from './users.model';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async getAllUser(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
  async createUser(data: Users): Promise<any> {
    const existing = await this.prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });
    if (existing) throw new ConflictException('username already exists!');
    return this.prisma.user.create({ data });
  }
}
