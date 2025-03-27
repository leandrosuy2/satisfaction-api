import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findByUsername(username: string): Promise<User>;
    remove(id: string): Promise<User>;
    getProfile(id: string): Promise<User>;
    updateProfile(id: string, updateProfileDto: UpdateProfileDto): Promise<User>;
    updatePassword(id: string, oldPassword: string, newPassword: string): Promise<User>;
}
