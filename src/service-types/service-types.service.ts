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

  create(createServiceTypeDto: CreateServiceTypeDto) {
    const serviceType = this.serviceTypeRepository.create(createServiceTypeDto);
    return this.serviceTypeRepository.save(serviceType);
  }

  findAll() {
    return this.serviceTypeRepository.find({
      where: { status: true },
    });
  }

  async findOne(id: string) {
    const serviceType = await this.serviceTypeRepository.findOne({
      where: { id, status: true },
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
}