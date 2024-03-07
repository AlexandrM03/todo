import { Component } from '@angular/core';
import { TimerComponent } from '../../components/timer/timer.component';
import { TimerService } from '../../services/timer.service';
import { TimerType } from '../../enum/timerType.enum';

@Component({
    selector: 'app-timers',
    standalone: true,
    imports: [TimerComponent],
    templateUrl: './timers.component.html',
    styleUrl: './timers.component.css'
})
export class TimersComponent {
    TimerType = TimerType

    constructor(private timerService: TimerService) { }

    startTimer(type: TimerType): void {
        this.timerService.createData(type).subscribe({
            error: err => console.error(err)
        });
    }
}
