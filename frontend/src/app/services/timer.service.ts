import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimerType } from '../enum/timerType.enum';
import { Observable } from 'rxjs';
import { Timer } from '../dto/timer.dto';
import { TimerData } from '../dto/timerData.dto';

@Injectable({
    providedIn: 'root'
})
export class TimerService {
    private apiUrl = '/timer';

    constructor(private http: HttpClient) { }

    createData(type: TimerType): Observable<Timer> {
        return this.http.post<Timer>(this.apiUrl, { type });
    }

    getData(startDate: string, endDate: string): Observable<TimerData> {
        return this.http.get<TimerData>(`${this.apiUrl}?startDate=${startDate}&endDate=${endDate}`);
    }
}
