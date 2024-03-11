import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
import { TimerService } from '../../services/timer.service';
import { TimerData } from '../../dto/timerData.dto';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-chart',
    standalone: true,
    imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, MatButtonModule],
    templateUrl: './chart.component.html',
    styleUrl: './chart.component.css',
    providers: [provideNativeDateAdapter()]
})
export class ChartComponent implements OnInit {
    @ViewChild('stepChart', { static: true }) stepChartElement: ElementRef = {} as ElementRef;

    range = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
    });

    constructor(
        private timerService: TimerService
    ) { }

    ngOnInit(): void {

    }

    loadChart(): void {
        if (this.range.value.start && this.range.value.end) {
            this.timerService
                .getData(this.range.value.start.toISOString(), this.range.value.end.toISOString())
                .subscribe({
                    next: data => this.renderStepChart(data),
                    error: error => console.error(error)
                });
        }
    }

    renderStepChart(data: TimerData): void {
        const stepChart = echarts.init(this.stepChartElement.nativeElement);

        const types = Object.keys(data);

        const seriesData = types.map(type => {
            const values = Object.values(data[type]);

            return {
                name: type,
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 10,
                data: values
            };
        });

        const option = {
            xAxis: {
                type: 'category',
                data: Object.keys(data[types[0]])
            },
            yAxis: {
                type: 'value'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data: types
            },
            toolbox: {
                left: 'center',
                itemSize: 25,
                top: 55,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {}
                }
            },
            dataZoom: [{
                type: 'inside',
                throttle: 50
            }],
            series: seriesData
        };

        stepChart.setOption(option);
    }
}
