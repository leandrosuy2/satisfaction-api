import { Repository } from 'typeorm';
import { CreateServiceTypeDto } from './dto/create-service-type.dto';
import { UpdateServiceTypeDto } from './dto/update-service-type.dto';
import { ServiceType } from './entities/service-type.entity';
export declare class ServiceTypesService {
    private serviceTypeRepository;
    constructor(serviceTypeRepository: Repository<ServiceType>);
    create(createServiceTypeDto: CreateServiceTypeDto): Promise<ServiceType>;
    findAll(): Promise<ServiceType[]>;
    findOne(id: string): Promise<ServiceType>;
    update(id: string, updateServiceTypeDto: UpdateServiceTypeDto): Promise<ServiceType>;
    remove(id: string): Promise<ServiceType>;
}
