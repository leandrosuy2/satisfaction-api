import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByUsername(registerDto.username);
    
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const user = await this.usersService.create({
      ...registerDto,
      password: registerDto.password,
    });

    const payload = { 
      sub: user.id,
      username: user.username,
      role: user.perfil_acesso[0]?.nome 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        nome: user.nome,
        perfil: user.perfil_acesso[0]?.nome,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByUsername(loginDto.username);
    
    if (!user || !await bcrypt.compare(loginDto.password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { 
      sub: user.id,
      username: user.username,
      role: user.perfil_acesso[0]?.nome 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        nome: user.nome,
        perfil: user.perfil_acesso[0]?.nome,
      },
    };
  }
}