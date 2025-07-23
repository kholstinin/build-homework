import { Tooltip, Tag, List, Button, Popconfirm, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { ITodoItem } from 'store/models/todo.model';

interface ITodoItemProps {
  todo: ITodoItem;
  onTodoRemoval: (todo: ITodoItem) => void;
  onTodoToggle: (todo: ITodoItem) => void;
}

export const TodoItem = ({
  todo,
  onTodoRemoval,
  onTodoToggle,
}: ITodoItemProps) => {
  return (
    <List.Item
      actions={[
        <Tooltip
          title={todo.completed ? 'Mark as uncompleted' : 'Mark as completed'}
        >
          <Switch
            onChange={() => onTodoToggle(todo)}
            defaultChecked={todo.completed}
          />
        </Tooltip>,
        <Popconfirm
          title="Are you sure you want to delete?"
          onConfirm={() => {
            onTodoRemoval(todo);
          }}
        >
          <Button className="remove-todo-button" type="primary" danger>
            X
          </Button>
        </Popconfirm>,
      ]}
      className="list-item"
      key={todo.id}
    >
      <div className="todo-item">
        <Tag color={todo.completed ? 'cyan' : 'red'} className="todo-tag">
          {todo.name}
        </Tag>
      </div>
    </List.Item>
  );
};
