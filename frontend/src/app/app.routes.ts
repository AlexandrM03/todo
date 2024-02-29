import { Routes } from '@angular/router';
import { TodoComponent } from './layout/todo/todo.component';
import { PhonesComponent } from './layout/phones/phones.component';

export const routes: Routes = [
    { path: '', redirectTo: '/todo', pathMatch: 'full' },
    { path: 'todo', component: TodoComponent },
    { path: 'phones', component: PhonesComponent }
];
