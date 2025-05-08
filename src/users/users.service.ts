import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserPermission } from './entities/user-permission.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePermissionsDto } from './dto/update-permissions.dto';
import { AccessProfile } from './enums/access-profile.enum';
import { Permission } from './enums/permission.enum';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserPermission)
    private userPermissionRepository: Repository<UserPermission>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      date_acs: new Date(),
      perfil_acesso: createUserDto.perfil_acesso || AccessProfile.CLIENTE,
    });

    const savedUser = await this.userRepository.save(user);

    // Inicializa as permissões do usuário
    await this.initializeUserPermissions(savedUser.id);

    return savedUser;
  }

  findAll() {
    return this.userRepository.find({
      where: { status: true },
      relations: ['empresas'],
      select: ['id', 'nome', 'username', 'email', 'cargo', 'perfil_acesso', 'empresas', 'created_at', 'updated_at'],
      order: {
        created_at: 'DESC'
      }
    });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id, status: true },
      relations: ['empresas'],
      select: ['id', 'nome', 'username', 'email', 'cargo', 'perfil_acesso', 'empresas', 'created_at', 'updated_at'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username, status: true },
      relations: ['empresas'],
      select: ['id', 'nome', 'username', 'email', 'cargo', 'perfil_acesso', 'empresas', 'created_at', 'updated_at', 'password'],
    });
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    user.status = false;
    return this.userRepository.save(user);
  }

  async getProfile(id: string) {
    const user = await this.userRepository.findOne({
      where: { id, status: true },
      relations: ['empresas'],
      select: ['id', 'nome', 'username', 'email', 'telcel', 'setor', 'cargo', 'perfil_acesso', 'empresas', 'image', 'created_at', 'updated_at'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async updateProfile(id: string, updateProfileDto: UpdateProfileDto) {
    const user = await this.userRepository.findOne({
      where: { id, status: true },
      relations: ['empresas'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateProfileDto.perfil_acesso) {
      user.perfil_acesso = updateProfileDto.perfil_acesso;
    }

    Object.assign(user, updateProfileDto);
    return this.userRepository.save(user);
  }

  async updatePassword(id: string, oldPassword: string, newPassword: string) {
    const user = await this.userRepository.findOne({
      where: { id, status: true },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new Error('Senha atual incorreta');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    return this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id, status: true },
      relations: ['empresas'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Se o username está sendo atualizado, verificar se já existe
    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUser = await this.userRepository.findOne({
        where: { username: updateUserDto.username, status: true },
      });

      if (existingUser) {
        throw new Error('Username already exists');
      }
    }

    // Se o email está sendo atualizado, verificar se já existe
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email, status: true },
      });

      if (existingUser) {
        throw new Error('Email already exists');
      }
    }

    // ✅ Corrigir aqui: aplicar hash se senha foi enviada
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async updatePermission(userId: string, updatePermissionsDto: UpdatePermissionsDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId, status: true },
      relations: ['permissions'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    let permission = user.permissions.find(p => p.permission === updatePermissionsDto.permission);

    if (!permission) {
      permission = this.userPermissionRepository.create({
        user_id: userId,
        permission: updatePermissionsDto.permission,
        has_permission: updatePermissionsDto.has_permission,
      });
    } else {
      permission.has_permission = updatePermissionsDto.has_permission;
    }

    return this.userPermissionRepository.save(permission);
  }

  async getUserPermissions(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId, status: true },
      relations: ['permissions'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user.permissions;
  }

  async initializeUserPermissions(userId: string) {
    const permissions = Object.values(Permission);
    const userPermissions = permissions.map(permission =>
      this.userPermissionRepository.create({
        user_id: userId,
        permission,
        has_permission: false,
      })
    );

    return this.userPermissionRepository.save(userPermissions);
  }
}