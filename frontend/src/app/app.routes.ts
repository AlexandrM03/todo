import { Routes } from '@angular/router';
import { TodoComponent } from './layout/todo/todo.component';
import { PhonesComponent } from './layout/phones/phones.component';
import { AnimationsComponent } from './layout/animations/animations.component';
import { TerminatorComponent } from './layout/terminator/terminator.component';
import { ChartComponent } from './layout/chart/chart.component';
import { TimersComponent } from './layout/timers/timers.component';

export const routes: Routes = [
    { path: '', redirectTo: '/todo', pathMatch: 'full' },
    { path: 'todo', component: TodoComponent },
    { path: 'phones', component: PhonesComponent },
    { path: 'animations', component: AnimationsComponent },
    { path: 'terminator', component: TerminatorComponent },
    { path: 'timers', component: TimersComponent },
    { path: 'chart', component: ChartComponent }
];
