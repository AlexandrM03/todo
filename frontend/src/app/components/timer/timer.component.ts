import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Subject, interval, takeUntil } from 'rxjs';

@Component({
    selector: 'app-timer',
    standalone: true,
    imports: [MatButtonModule, CommonModule],
    templateUrl: './timer.component.html',
    styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit, OnDestroy {
    @Input() time = '';
    @Output() onTimerStart = new EventEmitter<void>();
    @Output() onTimerPause = new EventEmitter<void>();
    @Output() onTimerResume = new EventEmitter<void>();
    @Output() onTimerRestart = new EventEmitter<void>();

    timeInSeconds = 0;
    private destroy$: Subject<void> = new Subject();
    isRunning = false;
    isPaused = false;

    constructor() { }

    ngOnInit(): void {
        this.timeInSeconds = this.parseTime(this.time);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    startTimer(): void {
        this.onTimerStart.emit();
        this.isRunning = true;
        interval(1000)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                if (this.timeInSeconds > 0) {
                    this.timeInSeconds--;
                } else {
                    this.stopTimer();
                }
            });
    }

    pauseTimer(): void {
        this.isPaused = true;
        this.onTimerPause.emit();
        this.isRunning = false;
        this.destroy$.next();
    }

    resumeTimer(): void {
        this.isPaused = false;
        this.onTimerResume.emit();
        this.isRunning = true;
        this.startTimer();
    }

    restartTimer(): void {
        this.onTimerRestart.emit();
        this.isRunning = false;
        this.isPaused = false;
        this.ngOnInit();
    }

    private stopTimer(): void {
        this.onTimerPause.emit();
        this.isRunning = false;
        this.destroy$.next();
    }

    parseTime(timeString: string): number {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    }

    get displayTime(): string {
        const hours = Math.floor(this.timeInSeconds / 3600);
        const minutes = Math.floor((this.timeInSeconds % 3600) / 60);
        const seconds = this.timeInSeconds % 60;
        return `${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
    }

    private padNumber(num: number): string {
        return num < 10 ? '0' + num : num.toString();
    }
}
