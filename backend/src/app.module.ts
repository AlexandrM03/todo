import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { PrismaService } from './prisma.service';
import { TimerModule } from './timer/timer.module';

@Module({
    imports: [TodoModule, TimerModule],
    controllers: [],
    providers: [PrismaService],
})
export class AppModule { }
