import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Permission } from '../enums/permission.enum';

@Entity('user_permissions')
export class UserPermission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: Permission })
  permission: Permission;

  @Column({ default: false })
  has_permission: boolean;

  @ManyToOne(() => User, user => user.permissions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;
} 