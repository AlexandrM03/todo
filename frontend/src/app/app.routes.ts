import { Routes } from '@angular/router';
import { TodoComponent } from './layout/todo/todo.component';
import { PhonesComponent } from './layout/phones/phones.component';
import { AnimationsComponent } from './layout/animations/animations.component';

export const routes: Routes = [
    { path: '', redirectTo: '/todo', pathMatch: 'full' },
    { path: 'todo', component: TodoComponent },
    { path: 'phones', component: PhonesComponent },
    { path: 'animations', component: AnimationsComponent }
];
