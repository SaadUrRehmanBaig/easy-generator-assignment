import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@common/dtos/create-user.dto';
import { SignInDto } from '@common/dtos/sign-in-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() createUserDto: CreateUserDto) {
    await this.authService.signUp(
      createUserDto.email,
      createUserDto.name,
      createUserDto.password,
    );
    return { message: 'User successfully registered' };
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() { email, password }: SignInDto) {
    const response = await this.authService.signIn(email, password);
    return response;
  }
}
