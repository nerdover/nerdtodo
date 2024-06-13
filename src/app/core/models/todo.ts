export interface Todo {
  title: string;
  dueDate: Date;
  done: boolean;

  id?: number;
  description?: string;
}

export interface CreateTodoDto {
  title: string;
  description?: string;
  dueDate: Date;
}

export interface UpdateTodoDto extends Partial<CreateTodoDto> {
  done?: boolean;
}
