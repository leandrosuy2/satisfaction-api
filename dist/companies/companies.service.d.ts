import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CompanyService } from './entities/company-service.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateCompanyServiceDto } from './dto/create-company-service.dto';
export declare class CompaniesService {
    private companyRepository;
    private companyServiceRepository;
    constructor(companyRepository: Repository<Company>, companyServiceRepository: Repository<CompanyService>);
    create(createCompanyDto: CreateCompanyDto): Promise<Company>;
    addService(id: string, createServiceDto: CreateCompanyServiceDto): Promise<CompanyService>;
    findAll(): Promise<Company[]>;
    findOne(id: string): Promise<Company>;
    findServices(id: string): Promise<CompanyService[]>;
    remove(id: string): Promise<Company>;
}
