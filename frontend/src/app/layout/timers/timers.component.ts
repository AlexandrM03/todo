import { Component } from '@angular/core';
import { TimerComponent } from '../../components/timer/timer.component';
import { TimerService } from '../../services/timer.service';
import { TimerType } from '../../enum/timerType.enum';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-timers',
    standalone: true,
    imports: [TimerComponent],
    templateUrl: './timers.component.html',
    styleUrl: './timers.component.css'
})
export class TimersComponent {
    TimerType = TimerType

    constructor(private timerService: TimerService, private notification: NotificationService) {
        this.notification.requestPermission();
    }

    startTimer(type: TimerType): void {
        this.timerService.createData(type).subscribe({
            error: err => console.error(err)
        });
    }

    onTimerEnd(): void {
        this.notification.showNotification('Time is up!', {
            body: `Your timer has ended.`
        });
    }
}
