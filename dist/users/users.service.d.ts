import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserPermission } from './entities/user-permission.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePermissionsDto } from './dto/update-permissions.dto';
export declare class UsersService {
    private userRepository;
    private userPermissionRepository;
    constructor(userRepository: Repository<User>, userPermissionRepository: Repository<UserPermission>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findByUsername(username: string): Promise<User>;
    remove(id: string): Promise<User>;
    getProfile(id: string): Promise<User>;
    updateProfile(id: string, updateProfileDto: UpdateProfileDto): Promise<User>;
    updatePassword(id: string, oldPassword: string, newPassword: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    updatePermission(userId: string, updatePermissionsDto: UpdatePermissionsDto): Promise<UserPermission>;
    getUserPermissions(userId: string): Promise<UserPermission[]>;
    initializeUserPermissions(userId: string): Promise<UserPermission[]>;
}
