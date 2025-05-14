import { IsString, IsEnum, IsOptional, MaxLength, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RatingType } from '../enums/rating-type.enum';

export class CreateVoteDto {
  @ApiProperty({ description: 'ID da empresa' })
  @IsString()
  id_empresa: string;

  @ApiProperty({ description: 'ID do tipo de serviço', required: false })
  @IsOptional()
  @IsString()
  id_tipo_servico?: string;

  @ApiProperty({
    description: 'Avaliação do serviço',
    enum: RatingType,
    example: RatingType.OTIMO
  })
  @IsEnum(RatingType)
  avaliacao: RatingType;

  @ApiProperty({
    description: 'Comentário opcional sobre o voto',
    required: false
  })
  @IsOptional()
  @IsString()
  comentario?: string;

  @ApiProperty({
    description: 'Linha consumida pelo usuário',
    required: false,
    maxLength: 20
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  linha?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'Momento exato em que o voto foi feito',
    required: false,
    example: '2025-05-14 08:00:00'
  })
  momento_voto?: string;
}
