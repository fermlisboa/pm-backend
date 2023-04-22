import { User } from 'src/modules/users/entities/user.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'projects' })
export class Projects {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 36 })
  title: string;

  @Column({ type: 'varchar', length: 36 })
  zip_code: string;

  @Column({ type: 'int' })
  cost: number;

  @Column({ type: 'boolean', default: false })
  done: boolean;
  
  @CreateDateColumn({ type: 'timestamp', nullable: false, default: '' })
  deadline: Date;

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({ name: 'user_id' })
  user: User;
  
  @CreateDateColumn({ type: 'timestamp', nullable: false, default: '' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false, default: '' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}