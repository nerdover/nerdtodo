export interface Todo {
  title: string;
  done: boolean;
  
  id?: number;
  description?: string;
  dueDate?: Date;
}

export interface CreateTodoDto {
  title: string;
  description?: string;
  dueDate?: Date;
}

export interface UpdateTodoDto extends Partial<CreateTodoDto> {
  done?: boolean;
}
