import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AccessProfile } from '../users/enums/access-profile.enum';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    register(registerDto: CreateUserDto): Promise<{
        access_token: string;
        user: {
            id: string;
            username: string;
            nome: string;
            email: string;
            perfil_acesso: AccessProfile;
        };
    }>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            username: any;
            nome: any;
            email: any;
            perfil_acesso: any;
        };
    }>;
    refreshToken(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            username: any;
            nome: any;
            email: any;
            perfil_acesso: any;
        };
    }>;
}
