import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { Projects } from '../projects/entities/projects.entity';
import { ProjectsService } from '../projects/services/projects.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Projects
    ])],
  controllers: [
    UserController
  ],
  providers: [
    UserService,
    ProjectsService
  ],
  exports: [
    UserService
  ]
})
export class UsersModule { }
