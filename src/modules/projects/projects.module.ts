import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects } from './entities/projects.entity';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsService } from './services/projects.service';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Projects,
      User
    ])],
  controllers: [
    ProjectsController
  ],
  providers: [
    ProjectsService, 
    UserService
  ],
  exports: [
    ProjectsService
  ],
})
export class ProjectsModule { }
