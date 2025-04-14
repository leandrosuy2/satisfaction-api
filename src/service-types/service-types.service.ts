import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceTypeDto } from './dto/create-service-type.dto';
import { UpdateServiceTypeDto } from './dto/update-service-type.dto';
import { ServiceType } from './entities/service-type.entity';

@Injectable()
export class ServiceTypesService {
  constructor(
    @InjectRepository(ServiceType)
    private serviceTypeRepository: Repository<ServiceType>,
  ) {}

  async create(createServiceTypeDto: CreateServiceTypeDto) {
    console.log('Criando serviço:', createServiceTypeDto);
    const serviceType = this.serviceTypeRepository.create({
      ...createServiceTypeDto,
      status: true
    });
    const savedService = await this.serviceTypeRepository.save(serviceType);
    console.log('Serviço criado:', savedService);
    return savedService;
  }

  findAll() {
    return this.serviceTypeRepository.find({
      where: { status: true },
    });
  }

  async findOne(id: string) {
    const serviceType = await this.serviceTypeRepository.findOne({
      where: [
        { id, status: true },
        { tipo_servico: id, status: true }
      ],
    });

    if (!serviceType) {
      throw new NotFoundException(`Service type with ID ${id} not found`);
    }

    return serviceType;
  }

  async update(id: string, updateServiceTypeDto: UpdateServiceTypeDto) {
    const serviceType = await this.findOne(id);
    this.serviceTypeRepository.merge(serviceType, updateServiceTypeDto);
    return this.serviceTypeRepository.save(serviceType);
  }

  async remove(id: string) {
    const serviceType = await this.findOne(id);
    serviceType.status = false;
    return this.serviceTypeRepository.save(serviceType);
  }

  async findAllActive() {
    const services = await this.serviceTypeRepository.find({
      where: { status: true },
      select: ['id', 'nome', 'tipo_servico', 'hora_inicio', 'hora_final']
    });
    console.log('Serviços ativos:', services);
    return services;
  }
}