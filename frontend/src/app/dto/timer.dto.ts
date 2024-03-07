import { TimerType } from '../enum/timerType.enum';

export interface Timer {
    id: string;
    type: TimerType;
    startedAt: Date;
}