import { Expose } from 'class-transformer';
import { IsBoolean, IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { BaseDto } from '../../common/dtos/base.dto';

export class UserDto extends BaseDto {
  @Expose()
  @IsUUID(4)
  public uuid: string;

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsBoolean()
  isActive: boolean;

  @Expose()
  @IsBoolean()
  isArchived: boolean;
}
