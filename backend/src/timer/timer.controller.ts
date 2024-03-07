import { Body, Controller, Get, Post } from '@nestjs/common';
import { TimerService } from './timer.service';
import { TimerType } from '@prisma/client';

@Controller('timer')
export class TimerController {
    constructor(private readonly timerService: TimerService) { }

    @Get()
    async getForGraph() {
        return await this.timerService.getForGraph();
    }

    @Post()
    async create(@Body('type') type: TimerType) {
        return await this.timerService.create(type);
    }
}
