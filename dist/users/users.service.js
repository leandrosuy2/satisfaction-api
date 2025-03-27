"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const access_profile_enum_1 = require("./enums/access-profile.enum");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
            date_acs: new Date(),
            perfil_acesso: createUserDto.perfil_acesso || access_profile_enum_1.AccessProfile.CLIENTE,
        });
        return this.userRepository.save(user);
    }
    findAll() {
        return this.userRepository.find({
            where: { status: true },
            select: ['id', 'nome', 'username', 'email', 'perfil_acesso', 'empresas'],
        });
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({
            where: { id, status: true },
            select: ['id', 'nome', 'username', 'email', 'perfil_acesso', 'empresas'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async findByUsername(username) {
        return this.userRepository.findOne({
            where: { username, status: true },
        });
    }
    async remove(id) {
        const user = await this.findOne(id);
        user.status = false;
        return this.userRepository.save(user);
    }
    async getProfile(id) {
        const user = await this.userRepository.findOne({
            where: { id, status: true },
            select: ['id', 'nome', 'username', 'email', 'telcel', 'setor', 'perfil_acesso', 'empresas', 'image'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async updateProfile(id, updateProfileDto) {
        const user = await this.userRepository.findOne({
            where: { id, status: true },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        if (updateProfileDto.perfil_acesso) {
            user.perfil_acesso = updateProfileDto.perfil_acesso;
        }
        Object.assign(user, updateProfileDto);
        return this.userRepository.save(user);
    }
    async updatePassword(id, oldPassword, newPassword) {
        const user = await this.userRepository.findOne({
            where: { id, status: true },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            throw new Error('Senha atual incorreta');
        }
        user.password = await bcrypt.hash(newPassword, 10);
        return this.userRepository.save(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map