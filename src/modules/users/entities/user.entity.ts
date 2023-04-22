import { Projects } from 'src/modules/projects/entities/projects.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 36 })
  name: string;

  @Column({ type: 'varchar', length: 36, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 36 })
  password: string;

  @OneToMany(() => Projects, (projects) => projects.user)
  projects: Projects[];
  
  @CreateDateColumn({ type: 'timestamp', nullable: false, default: '' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false, default: '' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}