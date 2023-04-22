import { Body, Controller, Delete, ForbiddenException, Get, Headers, HttpException, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { Projects } from '../entities/projects.entity';
import { ProjectsService } from '../services/projects.service';
import { CreateProjectDTO } from '../types/createProjectDTO';
import { parseUser } from 'src/utils/tools';
import { UserService } from 'src/modules/users/services/user.service';
import { UpdateProjectDTO } from '../types/updateProjectDTO';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@Controller('project')
export class ProjectsController {
  constructor(
    private readonly service: ProjectsService,
    private readonly userService: UserService,
  ) { }

  /*****************************************************************************
   * Get Projects - Get  all Projects
   * ---------------------------------------------------------------------------
   * @returns List of all Projects and total
   ****************************************************************************/
  @Get('all')
  async getProjects(): Promise<[Projects[], number]> {
    try {
      return await this.service.find({ relations: ['user'] });
    } catch (err) {
      throw new HttpException(
        {
          message: err.message,
        },
        Number(err.response.status)
      );
    }
  }

  /*****************************************************************************
   * Find Project - Find a Project
   * ---------------------------------------------------------------------------
   * @param id params to search
   * @returns Found Project
   ****************************************************************************/
  @Get(':id')
  async findProjectById(@Param('id') id: string): Promise<Projects> {
    try {
      return await this.service.findOne({ where: { id: id }, relations: ['user'] });
    } catch (err) {
      throw new HttpException(
        {
          message: err.message,
        },
        Number(err.response.status)
      );
    }
  }

  /*****************************************************************************
   * Find Projects List - Find all User's Projects
   * ---------------------------------------------------------------------------
   * @param data params to search
   * @returns Found Projects
   ****************************************************************************/
  @UseGuards(AuthGuard)
  @Get()
  async findProjectsByUser(@Headers() headers): Promise<Projects[]> {
    const userToken = parseUser(headers);
    const user = await this.userService.findOne({ where: { username: userToken.username }});
    try {
      return await this.service.findByUser({ where: { user: user } });
    } catch (err) {
      throw new HttpException(
        {
          message: err.message,
        },
        Number(err.response.status)
      );
    }
  }

  /*****************************************************************************
   * Create Projects - Create a Projects entry
   * ---------------------------------------------------------------------------
   * @param data Object data
   * @returns Object created
   ****************************************************************************/
  @UseGuards(AuthGuard)
  @Post()
  async createProject(@Body() data: CreateProjectDTO, @Headers() headers): Promise<Projects | object> {
    try {
      const userToken = parseUser(headers);
      const user = await this.userService.findOne({ where: { username: userToken.username }});
      data.user = user;
      return await this.service.save(data);
    } catch (err) {
      throw new HttpException(
        {
          message: err.message,
        },
        Number(err.response.status)
      );
    }
  }

  /*****************************************************************************
   * Update Projects - Update Projects entry
   * ---------------------------------------------------------------------------
   * @param id Id of Projects to update
   * @param data Projects data
   * @returns Update result
   ****************************************************************************/
  @UseGuards(AuthGuard)
  @Put('/:id')
  async updateProjects(@Param('id') id: string, @Body() data: UpdateProjectDTO, @Headers() headers): Promise<Projects> {
    // Prevent override
    data.id = id;
    const userToken = parseUser(headers);
    const user = await this.userService.findOne({ where: { username: userToken.username }});
    const project = await this.service.findOne({where: {id: id, user: user}});
    if(project) {
      return await this.service.save(data);
    } else {
      throw new HttpException(
        {
          message: "This project doesn't exists or doesn't belongs to you",
        },
        Number(ForbiddenException)
      );
    }
  }

  /*****************************************************************************
   * Update Project - Update Projects entry
   * ---------------------------------------------------------------------------
   * @param id Id of Projects to update
   * @returns Update result
   ****************************************************************************/
  @UseGuards(AuthGuard)
  @Patch(':id/done')
  async updateProject(@Param('id') id: string, @Headers() headers): Promise<Projects> {
    const userToken = parseUser(headers);
    const user = await this.userService.findOne({ where: { username: userToken.username }});
    const project = await this.service.findOne({where: {id: id, user: user}});
    if(project) {
      project.done = true;
      return await this.service.save(project);
    } else {
      throw new HttpException(
        {
          message: "This project doesn't exists or doesn't belongs to you",
        },
        Number(ForbiddenException)
      );
    }
  }

  /*****************************************************************************
   * Delete Projects - Soft delete Projects 
   * ---------------------------------------------------------------------------
   * @param id Id of Projects to delete
   * @returns Deletion result
   ****************************************************************************/
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProject(@Param('id') id: string, @Headers() headers): Promise<UpdateResult> {
    const userToken = parseUser(headers);
    const user = await this.userService.findOne({ where: { username: userToken.username }});
    const project = await this.service.findOne({where: {id: id, user: user}});
    if(project) {
      return await this.service.remove(project.id);
    } else {
      throw new HttpException(
        {
          message: "This project doesn't exists or doesn't belongs to you",
        },
        Number(ForbiddenException)
      );
    }
  }
}
