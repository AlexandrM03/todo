import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
import { TimerService } from '../../services/timer.service';
import { TimerData } from '../../dto/timerData.dto';

@Component({
    selector: 'app-chart',
    standalone: true,
    imports: [],
    templateUrl: './chart.component.html',
    styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit {
    @ViewChild('stepChart', { static: true }) stepChartElement: ElementRef = {} as ElementRef;

    constructor(
        private timerService: TimerService
    ) { }

    ngOnInit(): void {
        this.timerService.getData().subscribe({
            next: (timerData: TimerData) => {
                this.renderStepChart(timerData);
            }
        });
    }

    renderStepChart(data: TimerData): void {
        const stepChart = echarts.init(this.stepChartElement.nativeElement);

        const dates = Object.keys(data);
        const values = Object.values(data);

        const option = {
            xAxis: {
                type: 'category',
                data: dates
            },
            yAxis: {
                type: 'value',
                max: Math.max(...values) + 1
            },
            tooltip: {
                trigger: 'axis',
                formatter: '{b}: {c}',
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
            series: [{
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 10,
                data: values
            }]
        };

        stepChart.setOption(option);
    }
}
