import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { AccessProfile } from '../users/enums/access-profile.enum';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: string;
            username: string;
            nome: string;
            email: string;
            cargo: string;
            perfil_acesso: AccessProfile;
            empresas: import("../companies/entities/company.entity").Company[];
        };
    }>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            username: any;
            nome: any;
            email: any;
            cargo: any;
            perfil_acesso: any;
            empresas: any;
        };
    }>;
    refreshToken(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            username: any;
            nome: any;
            email: any;
            cargo: any;
            perfil_acesso: any;
            empresas: any;
        };
    }>;
}
