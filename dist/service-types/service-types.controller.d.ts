import { ServiceTypesService } from './service-types.service';
import { CreateServiceTypeDto } from './dto/create-service-type.dto';
import { UpdateServiceTypeDto } from './dto/update-service-type.dto';
export declare class ServiceTypesController {
    private readonly serviceTypesService;
    constructor(serviceTypesService: ServiceTypesService);
    create(createServiceTypeDto: CreateServiceTypeDto): Promise<import("./entities/service-type.entity").ServiceType>;
    findAll(): Promise<import("./entities/service-type.entity").ServiceType[]>;
    findOne(id: string): Promise<import("./entities/service-type.entity").ServiceType>;
    update(id: string, updateServiceTypeDto: UpdateServiceTypeDto): Promise<import("./entities/service-type.entity").ServiceType>;
    remove(id: string): Promise<import("./entities/service-type.entity").ServiceType>;
}
