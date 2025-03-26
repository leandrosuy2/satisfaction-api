import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, IsArray, IsOptional } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id_perfil: string;

  @ApiProperty()
  @IsArray()
  perfil_acesso: { nome: string; status: boolean }[];

  @ApiProperty()
  @IsArray()
  empresas: { id_empresa: string; nome_empresa: string; status: boolean }[];

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

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  setor?: string;
} 