import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePermissionsDto } from './dto/update-permissions.dto';
import { AccessProfile } from './enums/access-profile.enum';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAccessProfiles(): {
        value: AccessProfile;
        label: AccessProfile;
    }[];
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    getProfile(id: string): Promise<import("./entities/user.entity").User>;
    updateProfile(id: string, updateProfileDto: UpdateProfileDto): Promise<import("./entities/user.entity").User>;
    updatePassword(id: string, body: {
        oldPassword: string;
        newPassword: string;
    }): Promise<import("./entities/user.entity").User>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    findByUsername(username: string): Promise<import("./entities/user.entity").User>;
    remove(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    getUserPermissions(id: string): Promise<import("./entities/user-permission.entity").UserPermission[]>;
    updatePermission(id: string, updatePermissionsDto: UpdatePermissionsDto): Promise<import("./entities/user-permission.entity").UserPermission>;
}
