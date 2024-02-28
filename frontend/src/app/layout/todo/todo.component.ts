import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../dto/todo.dto';
import { FormsModule } from '@angular/forms';
import { TodoCardComponent } from "../../components/todo-card/todo-card.component";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
    selector: 'app-todo',
    standalone: true,
    templateUrl: './todo.component.html',
    styleUrl: './todo.component.css',
    imports: [FormsModule, CommonModule, TodoCardComponent, MatInputModule, MatButtonModule, MatFormFieldModule]
})
export class TodoComponent implements OnInit {
    todos: Todo[] = [];
    newTodoTitle: string = '';

    constructor(
        private todoService: TodoService
    ) { }

    ngOnInit(): void {
        this.loadTodos();
    }

    loadTodos(): void {
        this.todoService.getAllTodos().subscribe({
            next: (todos: Todo[]) => this.todos = todos,
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
                    this.todos.push(todo);
                    this.newTodoTitle = '';
                },
                error: (error: any) => console.error(error)
            });
        }
    }

    updateTodoStatus(todo: Todo): void {
        this.todoService.changeTodoStatus(todo.id).subscribe({
            next: (updatedTodo: Todo) => {
                todo.completed = updatedTodo.completed;
            },
            error: (error: any) => console.error(error)
        });
    }

    deleteTodo(todo: Todo): void {
        this.todoService.deleteTodo(todo.id).subscribe({
            next: () => {
                this.todos = this.todos.filter(t => t.id !== todo.id);
            },
            error: (error: any) => console.error(error)
        });
    }

    getUncompletedTodos(): Todo[] {
        return this.todos.filter(todo => !todo.completed);
    }

    getCompletedTodos(): Todo[] {
        return this.todos.filter(todo => todo.completed);
    }
}
