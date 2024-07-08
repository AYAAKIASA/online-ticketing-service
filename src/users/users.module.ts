import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { JwtModule } from '@nestjs/jwt'; // JwtModule 추가
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // JwtAuthGuard import 추가

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // User 엔터티를 사용하기 위해 TypeOrmModule.forFeature 사용
    JwtModule.register({}), // JwtModule 임포트 및 설정
  ],
  controllers: [UsersController], // UsersController를 올바르게 임포트하는지 확인
  providers: [
    UsersService, // UsersService를 제공함
    JwtAuthGuard, // JwtAuthGuard 프로바이더 추가
  ],
  exports: [UsersService], // UsersService를 내보냄
})
export class UsersModule {}
