import { AppConstants } from '@common/constants/constants';
import {
  IsString,
  MinLength,
  Matches,
  IsNotEmpty,
} from 'class-validator';
import { SignInDto } from './sign-in-dto';

export class CreateUserDto extends SignInDto {
  
  @IsString()
  @IsNotEmpty({ message: AppConstants.MESSGES.REQUIRED_NAME })
  name: string;

  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: AppConstants.MESSGES.WEAK_PASSWORD,
  })
  password: string;
}
