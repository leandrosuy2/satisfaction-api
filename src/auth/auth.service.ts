import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RegisterDto } from './dto/register.dto';
import { AccessProfile } from '../users/enums/access-profile.enum';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create({
      ...registerDto,
      password: registerDto.password,
      perfil_acesso: registerDto.perfil_acesso || AccessProfile.CLIENTE,
    });

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        nome: user.nome,
        email: user.email,
        cargo: user.cargo,
        perfil_acesso: user.perfil_acesso,
        empresas: user.empresas,
      }
    };
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        nome: user.nome,
        email: user.email,
        cargo: user.cargo,
        perfil_acesso: user.perfil_acesso,
        empresas: user.empresas,
      }
    };
  }

  async refreshToken(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        nome: user.nome,
        email: user.email,
        cargo: user.cargo,
        perfil_acesso: user.perfil_acesso,
        empresas: user.empresas,
      }
    };
  }
}