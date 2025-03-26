import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CompanyService } from './entities/company-service.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateCompanyServiceDto } from './dto/create-company-service.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { UpdateCompanyServiceDto } from './dto/update-company-service.dto';
export declare class CompaniesService {
    private companyRepository;
    private companyServiceRepository;
    constructor(companyRepository: Repository<Company>, companyServiceRepository: Repository<CompanyService>);
    create(createCompanyDto: CreateCompanyDto): Promise<Company>;
    addService(id: string, createServiceDto: CreateCompanyServiceDto): Promise<CompanyService>;
    findAll(): Promise<Company[]>;
    findOne(id: string): Promise<Company>;
    update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<Company>;
    updateService(id: string, serviceId: string, updateServiceDto: UpdateCompanyServiceDto): Promise<CompanyService>;
    findServices(id: string): Promise<CompanyService[]>;
    remove(id: string): Promise<Company>;
    removeService(id: string, serviceId: string): Promise<CompanyService>;
}
