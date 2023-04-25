import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/users/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({where: {username: username}});
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { name: user.name, username: user.username, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
      name: user.name
    };
  }
}