import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../dto/todo.dto';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-todo-card',
    standalone: true,
    imports: [CommonModule, MatCheckboxModule, MatButtonModule, MatIconModule],
    templateUrl: './todo-card.component.html',
    styleUrl: './todo-card.component.css'
})
export class TodoCardComponent {
    @Input({ required: true }) todo!: Todo;
    @Output() todoStatusChange: EventEmitter<Todo> = new EventEmitter<Todo>();
    @Output() todoDelete: EventEmitter<Todo> = new EventEmitter<Todo>();

    onCheckboxChange(): void {
        this.todoStatusChange.emit(this.todo);
    }

    onDeleteTodo(): void {
        this.todoDelete.emit(this.todo);
    }
}
