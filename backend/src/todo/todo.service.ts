import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TodoService {
    constructor(
        private prisma: PrismaService
    ) { }

    async getAll() {
        return await this.prisma.todo.findMany();
    }

    async create(title: string) {
        return await this.prisma.todo.create({
            data: {
                title
            }
        });
    }

    async update(id: string, title: string) {
        return await this.prisma.todo.update({
            where: { id },
            data: { title }
        });
    }

    async changeStatus(id: string) {
        const todo = await this.prisma.todo.findUnique({
            where: { id }
        });

        return await this.prisma.todo.update({
            where: { id },
            data: { completed: !todo.completed }
        });
    }

    async delete(id: string) {
        return await this.prisma.todo.delete({
            where: { id }
        });
    }
}
