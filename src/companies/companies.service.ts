import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CompanyService } from './entities/company-service.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateCompanyServiceDto } from './dto/create-company-service.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { UpdateCompanyServiceDto } from './dto/update-company-service.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(CompanyService)
    private companyServiceRepository: Repository<CompanyService>,
  ) { }

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
      relations: ['usuarios', 'servicos'],
      order: {
        created_at: 'DESC'
      }
    });
  }

  async findOne(id: string) {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['usuarios', 'servicos'],
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.findOne(id);
    Object.assign(company, updateCompanyDto);
    return this.companyRepository.save(company);
  }

  async updateService(id: string, serviceId: string, updateServiceDto: UpdateCompanyServiceDto) {
    const service = await this.companyServiceRepository.findOne({
      where: { id: serviceId, id_empresa: id },
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${serviceId} not found in company ${id}`);
    }

    Object.assign(service, updateServiceDto);
    return this.companyServiceRepository.save(service);
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

  async removeService(id: string, serviceId: string) {
    const service = await this.companyServiceRepository.findOne({
      where: { id: serviceId, id_empresa: id },
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${serviceId} not found in company ${id}`);
    }

    service.status = false;
    return this.companyServiceRepository.save(service);
  }

  async addUser(companyId: string, userId: string) {
    const company = await this.findOne(companyId);
    company.usuarios = [...(company.usuarios || []), { id: userId } as any];
    return this.companyRepository.save(company);
  }

  async removeUser(companyId: string, userId: string) {
    const company = await this.findOne(companyId);
    company.usuarios = company.usuarios.filter(user => user.id !== userId);
    return this.companyRepository.save(company);
  }
  async findByUser(userId: string) {
    try {
      console.log('🔍 Buscando empresas do userId:', userId);

      return await this.companyRepository
        .createQueryBuilder('company')
        .innerJoin('company.usuarios', 'user')
        .leftJoinAndSelect('company.servicos', 'servicos')
        .where('user.id = :userId', { userId })
        .getMany();
    } catch (error) {
      console.error('❌ Erro ao buscar empresas por usuário:', error);
      throw error;
    }
  }
}