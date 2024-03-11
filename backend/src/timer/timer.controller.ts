import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TimerService } from './timer.service';
import { TimerType } from '@prisma/client';

@Controller('timer')
export class TimerController {
    constructor(private readonly timerService: TimerService) { }

    @Get()
    async getForGraph(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ) {
        return await this.timerService.getForGraph(startDate, endDate);
    }

    @Post()
    async create(@Body('type') type: TimerType) {
        return await this.timerService.create(type);
    }
}
