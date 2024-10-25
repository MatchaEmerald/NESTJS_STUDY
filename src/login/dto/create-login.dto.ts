import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateLoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 13, { message: '不能超过十个字符' })
  id: string;

  name: string;
}
