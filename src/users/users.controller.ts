import { Controller, Req, Res, Get, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/authentication/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.usersService.getAllUser();
      return response.status(200).json({
        status: 'OK!',
        message: 'Successfully fetch data!',
        result,
      });
    } catch (err) {
      console.log(err);
      return response.status(500).json({
        status: 'OK!',
        message: 'Internal Server Error!',
      });
    }
  }
}
