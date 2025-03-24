import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionnaireDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id_empresa: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_add: string;
}