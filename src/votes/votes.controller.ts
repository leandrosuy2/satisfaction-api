import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateVoteDto } from './dto/create-vote.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { VotesService } from './votes.service';

@ApiTags('votes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new vote' })
  @ApiResponse({ status: 201, description: 'Vote successfully created' })
  create(@Body() createVoteDto: CreateVoteDto) {
    return this.votesService.create(createVoteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all votes' })
  @ApiResponse({ status: 200, description: 'Return all votes' })
  findAll() {
    return this.votesService.findAll();
  }

  // @Get('analytics/:companyId')
  // @ApiOperation({ summary: 'Get votes analytics for a company' })
  // @ApiResponse({ status: 200, description: 'Return votes analytics for the specified company' })
  // getAnalytics(@Param('companyId') companyId: string) {
  //   return this.votesService.getAnalytics(companyId);
  // }

  // @Get('analytics/:companyId')
  // getAnalytics(
  //   @Param('companyId') companyId: string,
  //   @Query('startDate') startDate?: string,
  //   @Query('endDate') endDate?: string,
  // ) {
  //   return this.votesService.getAnalytics(companyId, startDate, endDate);
  // }
  @Get('analytics/:companyId')
  getAnalytics(@Param('companyId') companyId: string) {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    return this.votesService.getAnalytics(companyId, start.toISOString(), end.toISOString());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get vote by ID' })
  @ApiResponse({ status: 200, description: 'Return vote by ID' })
  @ApiResponse({ status: 404, description: 'Vote not found' })
  findOne(@Param('id') id: string) {
    return this.votesService.findOne(id);
  }

  @Get('empresa/:id_empresa')
  @ApiOperation({ summary: 'Get votes by company' })
  @ApiResponse({ status: 200, description: 'Return votes by company' })
  findByEmpresa(@Param('id_empresa') id_empresa: string) {
    return this.votesService.findByEmpresa(id_empresa);
  }

  @Get('servico/:id_tipo_servico')
  @ApiOperation({ summary: 'Get votes by service type' })
  @ApiResponse({ status: 200, description: 'Return votes by service type' })
  findByTipoServico(@Param('id_tipo_servico') id_tipo_servico: string) {
    return this.votesService.findByTipoServico(id_tipo_servico);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a vote' })
  @ApiResponse({ status: 200, description: 'Vote successfully deleted' })
  @ApiResponse({ status: 404, description: 'Vote not found' })
  remove(@Param('id') id: string) {
    return this.votesService.remove(id);
  }
} 