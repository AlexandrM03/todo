import { Injectable } from '@nestjs/common';
import { TimerType } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TimerService {
    constructor(
        private prisma: PrismaService
    ) { }

    async create(type: TimerType) {
        return await this.prisma.timer.create({
            data: {
                type
            }
        });
    }

    async getForGraph() {
        const timers = await this.prisma.timer.findMany({
            orderBy: {
                startedAt: 'asc'
            }
        });

        const result = timers.reduce((acc, timer) => {
            const date = timer.startedAt.toISOString().split('T')[0];
            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date]++;
            return acc;
        }, {});

        return result;
    }
}
