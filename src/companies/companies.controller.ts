import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Request } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateCompanyServiceDto } from './dto/create-company-service.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { UpdateCompanyServiceDto } from './dto/update-company-service.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LineType } from './enums/line-type.enum';

@ApiTags('companies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({ status: 201, description: 'Company successfully created' })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Post(':id/services')
  addService(
    @Param('id') id: string,
    @Body() createServiceDto: CreateCompanyServiceDto,
  ) {
    return this.companiesService.addService(id, createServiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'Return all companies' })
  findAll() {
    return this.companiesService.findAll();
  }

  @Get('lines')
  @ApiOperation({ summary: 'Get available line types' })
  @ApiResponse({
    status: 200,
    description: 'Return available line types',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          value: { type: 'number' },
          label: { type: 'string' }
        }
      }
    }
  })
  getLineTypes() {
    return Object.entries(LineType)
      .filter(([key]) => isNaN(Number(key))) // Remove numeric keys
      .map(([key, value]) => ({
        value: value,
        label: key
      }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get company by ID' })
  @ApiResponse({ status: 200, description: 'Return company by ID' })
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Get(':id/services')
  findServices(@Param('id') id: string) {
    return this.companiesService.findServices(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update company' })
  @ApiResponse({ status: 200, description: 'Company successfully updated' })
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Patch(':id/services/:serviceId')
  updateService(
    @Param('id') id: string,
    @Param('serviceId') serviceId: string,
    @Body() updateServiceDto: UpdateCompanyServiceDto,
  ) {
    return this.companiesService.updateService(id, serviceId, updateServiceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete company' })
  @ApiResponse({ status: 200, description: 'Company successfully deleted' })
  remove(@Param('id') id: string) {
    return this.companiesService.remove(id);
  }

  @Delete(':id/services/:serviceId')
  removeService(
    @Param('id') id: string,
    @Param('serviceId') serviceId: string,
  ) {
    return this.companiesService.removeService(id, serviceId);
  }

  @Post(':id/users/:userId')
  @ApiOperation({ summary: 'Add user to company' })
  @ApiResponse({ status: 200, description: 'User successfully added to company' })
  addUser(@Param('id') id: string, @Param('userId') userId: string) {
    return this.companiesService.addUser(id, userId);
  }

  @Delete(':id/users/:userId')
  @ApiOperation({ summary: 'Remove user from company' })
  @ApiResponse({ status: 200, description: 'User successfully removed from company' })
  removeUser(@Param('id') id: string, @Param('userId') userId: string) {
    return this.companiesService.removeUser(id, userId);
  }

  @Get('my/my')
  @ApiOperation({ summary: 'Get companies of the authenticated user' })
  @ApiResponse({ status: 200, description: 'Companies linked to the user returned successfully' })
  getMyCompanies(@Request() req) {
    const userId = req.user?.id; // ou req.user?.sub dependendo da sua strategy
    return this.companiesService.findByUser(userId);
  }
}