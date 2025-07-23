import { List } from 'antd';

import { TodoItem } from 'components/TodoItem';
import { ITodoItem } from 'store/models/todo.model';

interface ITodoListProps {
  todos: ITodoItem[];
  onTodoRemoval: (id: ITodoItem) => void;
  onTodoToggle: (todo: ITodoItem) => void;
}

export const TodoList = ({
  todos,
  onTodoRemoval,
  onTodoToggle,
}: ITodoListProps) => (
  <List
    locale={{
      emptyText: "There's nothing to do :(",
    }}
    dataSource={todos}
    renderItem={(todo) => (
      <TodoItem
        todo={todo}
        onTodoToggle={onTodoToggle}
        onTodoRemoval={onTodoRemoval}
      />
    )}
    pagination={{
      position: 'bottom',
      pageSize: 10,
    }}
  />
);
