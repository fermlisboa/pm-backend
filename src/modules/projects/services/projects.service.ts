import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { Projects } from '../entities/projects.entity';
import { CreateProjectDTO } from '../types/createProjectDTO';
import { UpdateProjectDTO } from '../types/updateProjectDTO';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Projects)
  private repository: Repository<Projects>
  ) { }

  repo(): Repository<Projects> {
    return this.repository;
  }

  find(options: FindManyOptions<Projects> = {}): Promise<[Projects[], number]> {
    return this.repository.findAndCount(options);
  }

  findAll(options: FindManyOptions<Projects> = {}): Promise<Projects[]> {
    return this.repository.find(options);
  }

  findByUser(options: FindManyOptions<Projects> = {}): Promise<Projects[]> {
    return this.repository.find(options);
  }

  findOne(params: FindOneOptions<Projects>): Promise<Projects> {
    return this.repository.findOne(params);
  }

  save(condition: CreateProjectDTO): Promise<Projects> {
    return this.repository.save(condition);
  }

  update(id: string, condition: Partial<UpdateProjectDTO>): Promise<UpdateResult> {
    return this.repository.update(id, condition);
  }

  remove(id: string): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }
}
