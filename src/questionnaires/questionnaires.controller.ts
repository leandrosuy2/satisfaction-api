import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { QuestionnairesService } from './questionnaires.service';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { AddQuestionnaireQuestionDto } from './dto/add-questionnaire-question.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('questionnaires')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('questionnaires')
export class QuestionnairesController {
  constructor(private readonly questionnairesService: QuestionnairesService) {}

  @Post()
  create(@Body() createQuestionnaireDto: CreateQuestionnaireDto) {
    return this.questionnairesService.create(createQuestionnaireDto);
  }

  @Post(':id/questions')
  addQuestion(
    @Param('id') id: string,
    @Body() addQuestionDto: AddQuestionnaireQuestionDto,
  ) {
    return this.questionnairesService.addQuestion(id, addQuestionDto);
  }

  @Get()
  findAll() {
    return this.questionnairesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionnairesService.findOne(id);
  }

  @Get('company/:companyId')
  findByCompany(@Param('companyId') companyId: string) {
    return this.questionnairesService.findByCompany(companyId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionnairesService.remove(id);
  }
}