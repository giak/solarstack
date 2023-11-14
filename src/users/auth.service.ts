import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.usersService.findOneByUserEmail(email);
    if (users) {
      throw new BadRequestException('Email already exists');
    }
    const user = this.usersService.create({ email, password });

    return user;
  }

  async signin(email: string, password: string) {
    let user = null;
    try {
      user = await this.usersService.validateCredentials({ email, password });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException('Invalid credentials', error.message);
      }
    }

    return user;
  }
}
