import { ApiProperty } from '@nestjs/swagger';

export class CreateGuardDto {
  @ApiProperty({ example: '张三' })
  name: string;
  @ApiProperty({ example: 18 })
  age: number;
}
