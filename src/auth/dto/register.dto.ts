import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, IsArray, IsOptional, IsEmail, IsEnum } from 'class-validator';
import { AccessProfile } from '../../users/enums/access-profile.enum';

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
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ enum: AccessProfile, default: AccessProfile.CLIENTE })
  @IsEnum(AccessProfile)
  perfil_acesso: AccessProfile;

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
  telcel?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  setor?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cargo?: string;
} 