import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      date_acs: new Date(),
    });
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({
      where: { status: true },
      select: ['id', 'nome', 'username', 'email', 'perfil_acesso', 'empresas'],
    });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id, status: true },
      select: ['id', 'nome', 'username', 'email', 'perfil_acesso', 'empresas'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username, status: true },
    });
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    user.status = false;
    return this.userRepository.save(user);
  }
}