import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { Performance } from './performances/performances.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; // ConfigModule, ConfigService 추가

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // ConfigModule import 추가
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '01031844869', // 환경 변수로 비밀번호 관리
        database: 'world',
        entities: [User, Performance],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({ // JwtModule 설정을 비동기로 변경
      imports: [ConfigModule], // ConfigModule import 추가
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // 환경 변수로 비밀 키 관리
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
