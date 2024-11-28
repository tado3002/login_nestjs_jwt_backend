import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { TokenBlacklistService } from 'src/authentication/token-blacklist/token-blacklist.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, TokenBlacklistService],
})
export class UsersModule {}
