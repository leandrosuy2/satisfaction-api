import { User } from './user.entity';
import { Permission } from '../enums/permission.enum';
export declare class UserPermission {
    id: string;
    permission: Permission;
    has_permission: boolean;
    user: User;
    user_id: string;
}
