import { Controller, Get, Patch, Request, UseGuards, Body, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { Request as ExpressRequest } from 'express';
import { User } from './users.entity'; // User 타입을 import

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: ExpressRequest): Promise<User> {
    const userId = (req as any).user.userId; // 타입 단언을 사용하여 req.user가 항상 존재함을 TypeScript에게 명시
    if (!userId) {
      throw new UnauthorizedException('User not authorized');
    }
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new UnauthorizedException('User not authorized');
    }
    return user; // 반환 타입을 명시적으로 Promise<User>로 지정
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(@Request() req: ExpressRequest, @Body() updateUserDto: any): Promise<User> {
    const userId = (req as any).user.userId; // 타입 단언을 사용하여 req.user가 항상 존재함을 TypeScript에게 명시
    if (!userId) {
      throw new UnauthorizedException('User not authorized');
    }
    const updatedUser = await this.usersService.update(userId, updateUserDto);
    if (!updatedUser) {
      throw new UnauthorizedException('User not authorized');
    }
    return updatedUser; // 반환 타입을 명시적으로 Promise<User>로 지정
  }
}
