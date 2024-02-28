import { Routes } from '@angular/router';
import { TodoComponent } from './layout/todo/todo.component';

export const routes: Routes = [
    { path: '**', redirectTo: 'todo' },
    { path: 'todo', component: TodoComponent }
];
