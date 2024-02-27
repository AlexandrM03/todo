import { Controller, Get, Post, Put, Body, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Get()
    async getAll() {
        return await this.todoService.getAll();
    }

    @Post()
    async create(@Body('title') title: string) {
        return await this.todoService.create(title);
    }

    @Put()
    async update(@Body('id') id: string, @Body('title') title: string) {
        return await this.todoService.update(id, title);
    }

    @Put(':id')
    async changeStatus(@Param('id') id: string) {
        return await this.todoService.changeStatus(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.todoService.delete(id);
    }
}
