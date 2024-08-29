import { AppConstants } from '@common/constants/constants';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty({ message: AppConstants.MESSGES.REQUIRED_EMAIL })
  email: string;

  @IsString()
  @IsNotEmpty({ message: AppConstants.MESSGES.REQUIRED_PASSWORD })
  password: string;
}
