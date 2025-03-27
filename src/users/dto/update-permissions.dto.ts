import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsBoolean } from 'class-validator';
import { Permission } from '../enums/permission.enum';

export class UpdatePermissionsDto {
  @ApiProperty({ enum: Permission })
  @IsEnum(Permission)
  permission: Permission;

  @ApiProperty()
  @IsBoolean()
  has_permission: boolean;
} 