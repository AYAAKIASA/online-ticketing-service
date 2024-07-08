import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './users.entity'; // 실제 경로에 맞게 수정해야 합니다.
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // JwtService import 추가
import { Request } from 'express'; // Request import 추가

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findByUsername: jest.fn(),
          },
        },
        JwtAuthGuard, // JwtAuthGuard 추가
        JwtService, // JwtService 추가
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProfile', () => {
    it('should return user profile', async () => {
      const user: User = {
        id: 1,
        username: 'testuser',
        password: 'testpassword',
        nickname: 'testnickname',
        points: 1000000,
        is_admin: false,
        userId: undefined
      };

      jest.spyOn(service, 'findByUsername').mockResolvedValue(user as User | null);

      const request = { user: { username: 'testuser' } } as unknown as Request;
      const result = await controller.getProfile(request);
      expect(result).toEqual({
        nickname: 'testnickname',
        points: 1000000,
      });
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(service, 'findByUsername').mockResolvedValue(null);

      const request = { user: { username: 'testuser' } } as unknown as Request;
      try {
        await controller.getProfile(request);
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect((error as NotFoundException).message).toEqual('User not found');
      }
    });
  });
});
