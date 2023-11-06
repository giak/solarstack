import { Expose } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';

export class BaseDto {
  @Expose()
  @IsNumber()
  id: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  modifiedAt: Date;

  @IsDate()
  deletedAt: Date;
}
