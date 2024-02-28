import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../dto/todo.dto';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private apiUrl = '/todo';

    constructor(private http: HttpClient) { }

    getAllTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.apiUrl);
    }

    createTodo(title: string): Observable<Todo> {
        return this.http.post<Todo>(this.apiUrl, { title });
    }

    updateTodo(id: string, title: string): Observable<Todo> {
        return this.http.put<Todo>(`${this.apiUrl}/${id}`, { title });
    }

    changeTodoStatus(id: string): Observable<Todo> {
        return this.http.put<Todo>(`${this.apiUrl}/${id}`, {});
    }

    deleteTodo(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
