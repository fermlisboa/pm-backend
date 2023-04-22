import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Query } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { CreateUserDTO } from '../types/createUserDTO';

@Controller('user')
export class UserController {
  constructor(
    private readonly service: UserService,
  ) { }

  /*****************************************************************************
   * Get User - Get  all Users
   * ---------------------------------------------------------------------------
   * @returns List of all Users and total
   ****************************************************************************/
  @Get('all')
  async getUsers(): Promise<[User[], number]> {
    try {
      return await this.service.find({ relations: ['projects'] });
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
   * Find User - Find a User
   * ---------------------------------------------------------------------------
   * @param username params to search
   * @returns Found User
   ****************************************************************************/
  @Get(':username')
  async findUserByUsername(@Param('username') username: string): Promise<User> {
    try {
      return await this.service.findOne({ where: { username: username }, relations: ['projects'] });
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
   * Create User - Create a User entry
   * ---------------------------------------------------------------------------
   * @param data Object data
   * @returns Object created
   ****************************************************************************/
  @Post()
  async createUser(@Body() data: CreateUserDTO): Promise<User | object> {
    try {
      let user = await this.service.findOne({ where: {username: data.username} });
      if ( user != undefined ) {
        return {
          msg: 'User already exists!'
        }
      }
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
   * Update User - Update User entry
   * ---------------------------------------------------------------------------
   * @param id Id of User to update
   * @param data User data
   * @returns Update result
   ****************************************************************************/
  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() data: User): Promise<User> {
    // Prevent override
    data.id = id;
    try {
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
   * Delete User - Soft delete User 
   * ---------------------------------------------------------------------------
   * @param id Id of User to delete
   * @returns Deletion result
   ****************************************************************************/
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UpdateResult> {
    try {
      return await this.service.remove(id);
    } catch (err) {
      throw new HttpException(
        {
          message: err.message,
        },
        Number(err.response.status)
      );
    }
  }
}
