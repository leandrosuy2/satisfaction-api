import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsOptional, Min } from 'class-validator';

export class CreateCompanyServiceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tipo_servico: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  hora_inicio: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  hora_final: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_add: string;

  @ApiProperty({ required: false, default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  qtd_ref?: number;


}
