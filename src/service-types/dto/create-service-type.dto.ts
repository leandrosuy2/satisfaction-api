import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServiceTypeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id_empresa: string;

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
}