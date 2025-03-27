import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsArray, IsEnum } from 'class-validator';
import { AccessProfile } from '../enums/access-profile.enum';

export class UpdateProfileDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  nome?: string;

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

  @ApiProperty({ enum: AccessProfile, required: false })
  @IsOptional()
  @IsEnum(AccessProfile)
  perfil_acesso?: AccessProfile;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  empresas?: { id_empresa: string; nome_empresa: string; status: boolean }[];
} 