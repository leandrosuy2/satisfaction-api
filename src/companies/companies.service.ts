import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CompanyService } from './entities/company-service.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateCompanyServiceDto } from './dto/create-company-service.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(CompanyService)
    private companyServiceRepository: Repository<CompanyService>,
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    const company = this.companyRepository.create(createCompanyDto);
    return this.companyRepository.save(company);
  }

  async addService(id: string, createServiceDto: CreateCompanyServiceDto) {
    const company = await this.findOne(id);
    const service = this.companyServiceRepository.create({
      ...createServiceDto,
      id_empresa: company.id,
    });
    return this.companyServiceRepository.save(service);
  }

  findAll() {
    return this.companyRepository.find({
      where: { status: true },
      relations: ['servicos'],
    });
  }

  async findOne(id: string) {
    const company = await this.companyRepository.findOne({
      where: { id, status: true },
      relations: ['servicos'],
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return company;
  }

  findServices(id: string) {
    return this.companyServiceRepository.find({
      where: { id_empresa: id, status: true },
    });
  }

  async remove(id: string) {
    const company = await this.findOne(id);
    company.status = false;
    return this.companyRepository.save(company);
  }
}