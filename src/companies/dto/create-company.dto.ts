import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean, IsEnum } from 'class-validator';
import { LineType } from '../enums/line-type.enum';

export class CreateCompanyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  razao_social: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  telcom?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  telcel?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cnpj?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  qt_funcionarios?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cep?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  rua?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  numero?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bairro?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cidade?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  estado?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_edt: string;

  @ApiProperty({ 
    enum: LineType,
    description: 'Tipo de linha da empresa (0: Votação, 1: Tradicional, 2: Leve, 3: Japonesa, 4: Grill, 5: Gourmet)',
    default: LineType.VOTACAO
  })
  @IsEnum(LineType)
  linha: LineType;
}