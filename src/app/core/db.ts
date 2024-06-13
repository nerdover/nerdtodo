import Dexie, { Table } from 'dexie';
import { Todo } from './models/todo';

export class AppDB extends Dexie {
  todos!: Table<Todo, number>;

  constructor() {
    super('nerdtododb');
    this.version(3).stores({
      todos: '++id',
    });
  }
}
