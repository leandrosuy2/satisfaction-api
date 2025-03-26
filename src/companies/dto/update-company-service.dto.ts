import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateCompanyServiceDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tipo_servico?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  hora_inicio?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  hora_final?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  user_add?: string;
} 