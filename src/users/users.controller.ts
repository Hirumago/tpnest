import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {

    }

    @Post()
    async create(@Body() userDto: UserDto) {
        await this.usersService.create(userDto);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Put(':id/update')
    async update(@Param('id') id, @Body() user: UserDto){
        await this.usersService.update(id, user);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
        return this.usersService.delete(id);
    }
}