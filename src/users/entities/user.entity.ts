import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'users', schema: 'public' })
export class UserEntity extends BaseEntity {
  @Index({ unique: true })
  @Column({ length: 256, unique: true })
  email: string;

  @Column({ length: 256 })
  password: string;

  @Column({ length: 256, nullable: true })
  name: string;
}
