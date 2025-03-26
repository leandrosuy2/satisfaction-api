export declare class RegisterDto {
    username: string;
    password: string;
    nome: string;
    id_perfil: string;
    perfil_acesso: {
        nome: string;
        status: boolean;
    }[];
    empresas: {
        id_empresa: string;
        nome_empresa: string;
        status: boolean;
    }[];
    image?: string;
    email?: string;
    telcel?: string;
    setor?: string;
}
