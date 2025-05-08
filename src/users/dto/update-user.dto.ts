import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsEnum, MinLength } from 'class-validator';
import { AccessProfile } from '../enums/access-profile.enum';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

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

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cargo?: string;

  @ApiProperty({ enum: AccessProfile, required: false })
  @IsOptional()
  @IsEnum(AccessProfile)
  perfil_acesso?: AccessProfile;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string; // ✅ Adicione isto
} 