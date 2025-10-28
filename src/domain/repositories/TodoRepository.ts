// CONTRATO: Define QUÉ operaciones existen, NO CÓMO se
// implementan
// Esta es la clave

import { Todo, CreateTodoDTO, UpdateTodoDTO } from '../entities/Todo';

export interface TodoRepository {
  getAll(): Promise<Todo[]>;
  getById(id: string): Promise<Todo | null>;
  create(todo: CreateTodoDTO): Promise<Todo>;
  update(todo: UpdateTodoDTO): Promise<Todo>;
  delete(id: string): Promise<void>;
}