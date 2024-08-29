import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '@common/schema/user.schema';
import { AppConstants } from '@common/constants/constants';
import { SignInResponseDto } from '@common/dtos/sign-in-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(email: string, name: string, password: string): Promise<User> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists)
      throw new BadRequestException({
        message: AppConstants.MESSGES.USER_EXIT,
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { email, name, password: hashedPassword } as UserDocument;
    return this.userRepository.create(user);
  }

  async signIn(email: string, password: string): Promise<SignInResponseDto> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException({
        message: AppConstants.MESSGES.EMAIL_PASSWORD_WRONG,
      });
    };
    return {
      token: this.jwtService.sign({ email: user.email, sub: user._id }),
      email: user.email,
      name: user.name,
    };
  }
}
