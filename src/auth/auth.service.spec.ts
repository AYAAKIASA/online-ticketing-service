import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockJwtToken'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a valid JWT token when login is successful', async () => {
    const user = { id: 1, username: 'test', password: 'test' };
    jest.spyOn(service, 'validateUser').mockResolvedValue(user);

    expect(await service.login(user)).toEqual({ access_token: 'mockJwtToken' });
  });

  it('should return null if validation fails', async () => {
    jest.spyOn(service, 'validateUser').mockResolvedValue(null);

    expect(await service.validateUser('test', 'wrongpassword')).toBeNull();
  });
});