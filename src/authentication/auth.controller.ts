import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login-user.dto';
import { RegisterUsersDto } from './dto/register-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Req() request: Request,
    @Res() response: Response,
    @Body() LoginDto: LoginDto,
  ): Promise<any> {
    try {
      const result = await this.authService.login(LoginDto);
      return response.status(200).json({
        status: 'OK!',
        message: 'successfully login!',
        result,
      });
    } catch (error) {
      return response.status(500).json({
        status: 'OK!',
        message: 'Internal server error!',
      });
    }
  }
  @Post('/register')
  async register(
    @Req() request: Request,
    @Res() response: Response,
    @Body() RegisterUsersDto: RegisterUsersDto,
  ): Promise<any> {
    try {
      const result = await this.authService.register(RegisterUsersDto);
      return response.status(200).json({
        status: 'OK!',
        message: 'successfully register!',
        result,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        status: 'OK!',
        message: 'Internal server error!',
      });
    }
  }
}
