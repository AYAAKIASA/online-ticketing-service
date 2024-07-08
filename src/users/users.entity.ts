import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
  id: number | undefined;

  @Column({ unique: true })
  @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
  username: string | undefined;

  @Column()
  @ApiProperty({ example: 'hashed_password', description: 'The hashed password of the user' })
  password: string | undefined;

  @Column()
  @ApiProperty({ example: 'John Doe', description: 'The nickname of the user' })
  nickname: string | undefined;

  @Column({ default: 1000000 })
  @ApiProperty({ example: 1000000, description: 'The points of the user' })
  points: number | undefined;

  @Column({ default: false })
  @ApiProperty({ example: false, description: 'Indicates if the user is an admin' })
  is_admin: boolean | undefined;

  // 추가된 userId 속성
  @Column()
  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
  userId: number | undefined;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial); // 이 부분은 Partial<User>의 속성들을 복사하여 클래스의 속성에 할당합니다.
  }
}
