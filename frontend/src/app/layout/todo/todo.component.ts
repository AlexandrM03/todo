import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../dto/todo.dto';
import { FormsModule } from '@angular/forms';
import { TodoCardComponent } from "../../components/todo-card/todo-card.component";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'app-todo',
    standalone: true,
    templateUrl: './todo.component.html',
    styleUrl: './todo.component.css',
    imports: [
        FormsModule,
        CommonModule,
        TodoCardComponent,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        CdkDropListGroup,
        CdkDropList,
        CdkDrag
    ],
    animations: [
        trigger('scaleInOut', [
            transition(':enter', [
                style({ transform: 'scale(0)' }),
                animate('0.2s', style({ transform: 'scale(1)' })),
            ])
        ]),
    ]
})
export class TodoComponent implements OnInit {
    uncompletedTodos: Todo[] = [];
    completedTodos: Todo[] = [];
    newTodoTitle: string = '';

    constructor(
        private todoService: TodoService
    ) { }

    ngOnInit(): void {
        this.loadTodos();
    }

    loadTodos(): void {
        this.todoService.getAllTodos().subscribe({
            next: (todos: Todo[]) => {
                todos.forEach(todo => {
                    if (todo.completed) {
                        this.completedTodos.push(todo);
                    } else {
                        this.uncompletedTodos.push(todo);
                    }
                });
            },
            error: (error: any) => console.error(error)
        });
    }

    onEnter(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            this.createTodo();
            event.preventDefault();
        }
    }

    createTodo(): void {
        if (this.newTodoTitle.trim()) {
            this.todoService.createTodo(this.newTodoTitle.trim()).subscribe({
                next: (todo: Todo) => {
                    this.uncompletedTodos.push(todo);
                    this.newTodoTitle = '';
                },
                error: (error: any) => console.error(error)
            });
        }
    }

    updateTodoStatus(todo: Todo): void {
        todo.completed = !todo.completed;
        if (todo.completed) {
            this.uncompletedTodos = this.uncompletedTodos.filter(t => t.id !== todo.id);
            this.completedTodos.push(todo);
        } else {
            this.completedTodos = this.completedTodos.filter(t => t.id !== todo.id);
            this.uncompletedTodos.push(todo);
        }
        this.todoService.changeTodoStatus(todo.id).subscribe({
            error: (error: any) => console.error(error)
        });
    }

    deleteTodo(todo: Todo): void {
        this.todoService.deleteTodo(todo.id).subscribe({
            next: () => {
                this.uncompletedTodos = this.uncompletedTodos.filter(t => t.id !== todo.id);
                this.completedTodos = this.completedTodos.filter(t => t.id !== todo.id);
            },
            error: (error: any) => console.error(error)
        });
    }

    drop(event: CdkDragDrop<Todo[]>): void {
        const todo = event.item.data;
        const previousContainer = event.previousContainer;
        const currentContainer = event.container;

        if (previousContainer !== currentContainer) {
            transferArrayItem(previousContainer.data, currentContainer.data, event.previousIndex, event.currentIndex);
            // this.updateTodoStatus(todo);
            todo.completed = !todo.completed;
            this.todoService.changeTodoStatus(todo.id).subscribe({
                error: (error: any) => console.error(error)
            });

        } else {
            moveItemInArray(currentContainer.data, event.previousIndex, event.currentIndex);
        }
    }
}
