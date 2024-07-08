import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { username } });
    return user || null;
  }

  async create(user: Partial<User>): Promise<User> {
    if (!user.password) {
      throw new Error('Password is required');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const newUser = this.usersRepository.create({
      ...user,
      password: hashedPassword,
      points: 1000000, // 초기 포인트 설정
    });
    return this.usersRepository.save(newUser);
  }

  async update(id: number, updateUserDto: Partial<User>): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      return null;
    }
  
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(updateUserDto.password, salt);
      updateUserDto.password = hashedPassword;
    }
  
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOne({ where: { id } }); // 명시적으로 FindOneOptions를 전달하지 않음
  }  

  async findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
