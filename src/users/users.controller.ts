import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AccessProfile } from './enums/access-profile.enum';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile/:id')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Return user profile' })
  getProfile(@Param('id') id: string) {
    return this.usersService.getProfile(id);
  }

  @Put('profile/:id')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'Profile successfully updated' })
  updateProfile(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(id, updateProfileDto);
  }

  @Put('profile/:id/password')
  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({ status: 200, description: 'Password successfully updated' })
  updatePassword(
    @Param('id') id: string,
    @Body() body: { oldPassword: string; newPassword: string },
  ) {
    return this.usersService.updatePassword(id, body.oldPassword, body.newPassword);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'Return user by ID' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('username/:username')
  @ApiOperation({ summary: 'Get user by username' })
  @ApiResponse({ status: 200, description: 'Return user by username' })
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'User successfully deleted' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Get('access-profiles')
  @ApiOperation({ summary: 'Get all available access profiles' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return all available access profiles',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          value: { type: 'string' },
          label: { type: 'string' }
        }
      }
    }
  })
  getAccessProfiles() {
    return Object.entries(AccessProfile).map(([key, value]) => ({
      value,
      label: value
    }));
  }
}