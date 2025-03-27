import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray, IsEmail, IsEnum } from 'class-validator';
import { AccessProfile } from '../enums/access-profile.enum';

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

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  telcel?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  id_perfil?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  setor?: string;

  @ApiProperty({ enum: AccessProfile, default: AccessProfile.CLIENTE })
  @IsEnum(AccessProfile)
  perfil_acesso: AccessProfile;

  @ApiProperty()
  @IsArray()
  empresas: { id_empresa: string; nome_empresa: string; status: boolean }[];
}