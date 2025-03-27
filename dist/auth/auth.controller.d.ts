import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: string;
            username: string;
            nome: string;
            email: string;
            perfil_acesso: import("../users/enums/access-profile.enum").AccessProfile;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            username: any;
            nome: any;
            email: any;
            perfil_acesso: any;
        };
    }>;
    refreshToken(req: Request): Promise<{
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
