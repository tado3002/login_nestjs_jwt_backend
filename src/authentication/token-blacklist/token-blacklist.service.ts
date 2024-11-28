import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TokenBlacklistService {
  constructor(private readonly prismaService: PrismaService) {}
  async addToken(token: string) {
    await this.prismaService.tokenBlackList.create({ data: { token } });
  }
  async isBlackListed(token: string) {
    const blacklistedToken = await this.prismaService.tokenBlackList.findUnique(
      { where: { token } },
    );
    return !!blacklistedToken;
  }
}
