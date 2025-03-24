import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  telcel?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id_perfil: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  setor?: string;

  @ApiProperty()
  @IsArray()
  perfil_acesso: { nome: string; status: boolean }[];

  @ApiProperty()
  @IsArray()
  empresas: { id_empresa: string; nome_empresa: string; status: boolean }[];
}