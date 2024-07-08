import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
  username: string;

  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'The nickname of the user' })
  nickname: string;
}