import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class AddQuestionnaireQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id_pergunta: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  ordem: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_add: string;
}