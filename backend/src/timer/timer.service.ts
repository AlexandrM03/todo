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

    async getForGraph(startDate: string, endDate: string) {
        const timers = await this.prisma.timer.findMany({
            where: {
                AND: [
                    { startedAt: { gte: startDate } },
                    { startedAt: { lte: endDate } }
                ]
            },
            orderBy: {
                startedAt: 'asc'
            },
            select: {
                startedAt: true,
                type: true
            }
        });

        const result = {};

        for (const timerType of Object.values(TimerType)) {
            result[timerType] = {};
            let currentDate = new Date(startDate);
            while (currentDate <= new Date(endDate)) {
                const formattedDate = currentDate.toISOString().split('T')[0];
                result[timerType][formattedDate] = 0;
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }

        timers.forEach(timer => {
            const date = timer.startedAt.toISOString().split('T')[0];
            if (result[timer.type][date] !== undefined) {
                result[timer.type][date]++;
            }
        });

        return result;
    }
}
