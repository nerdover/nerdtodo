import { Component, OnInit, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoService } from './core/services/todo.service';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly todos = inject(TodoService);

  todoList = computed(() => this.todos.todoList()?.reverse());

  ngOnInit(): void {
    this.todos.loadTodoList();
  }
}
