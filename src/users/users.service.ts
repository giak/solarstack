import { HttpException, HttpStatus, NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOneByUserUuid(uuid: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({ uuid });
  }

  async findOneByUserEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({ email });
  }

  findAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async create({ email, password }: { email: string; password: string }): Promise<UserEntity> {
    const userInDb = await this.findOneByUserEmail(email);
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: UserEntity = this.userRepository.create({ email, password });

    user.uuid = uuidv4();

    await this.userRepository.save(user);

    return user;
  }

  async update(uuid: string, attrs: Partial<UserEntity>) {
    const user = await this.findOneByUserUuid(uuid);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.userRepository.save(user);
  }

  async remove(uuid: string) {
    const user = await this.findOneByUserUuid(uuid);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return this.userRepository.remove(user);
  }

  async validateCredentials({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<UserEntity> {
    const user = await this.findOneByUserEmail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await this.comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  private async comparePasswords(userPassword: string, currentPassword: string) {
    return await bcrypt.compare(currentPassword, userPassword);
  }
}
