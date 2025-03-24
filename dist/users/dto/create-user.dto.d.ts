export declare class CreateUserDto {
    nome: string;
    username: string;
    password: string;
    image?: string;
    email?: string;
    telcel?: string;
    id_perfil: string;
    setor?: string;
    perfil_acesso: {
        nome: string;
        status: boolean;
    }[];
    empresas: {
        id_empresa: string;
        nome_empresa: string;
        status: boolean;
    }[];
}
