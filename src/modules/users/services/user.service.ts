import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDTO } from '../types/createUserDTO';
import { UpdateUserDTO } from '../types/updateUserDTO';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
  private repository: Repository<User>
  ) { }

  repo(): Repository<User> {
    return this.repository;
  }

  find(options: FindManyOptions<User> = {}): Promise<[User[], number]> {
    return this.repository.findAndCount(options);
  }

  findAll(options: FindManyOptions<User> = {}): Promise<User[]> {
    return this.repository.find(options);
  }

  findOne(params: FindOneOptions<User>): Promise<User> {
    return this.repository.findOne(params);
  }

  save(condition: CreateUserDTO): Promise<User> {
    return this.repository.save(condition);
  }

  update(id: string, condition: Partial<UpdateUserDTO>): Promise<UpdateResult> {
    return this.repository.update(id, condition);
  }

  remove(id: string): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }
}
