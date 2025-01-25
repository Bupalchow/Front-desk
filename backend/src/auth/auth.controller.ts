import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    try {
      return await this.authService.login(loginDto.username, loginDto.password);
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @Post('register')
  async register(
    @Body() registerDto: { username: string; password: string; name: string }
  ) {
    return this.authService.register(registerDto);
  }
}