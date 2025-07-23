import { Row, Col, Card } from 'antd';
import { message } from 'antd';

import { AddTodoForm } from 'components/AddTodoForm';
import { TodoList } from 'components/TodoList';
import useTodoStore from 'store/todo-store';
import { ITodoItem } from 'store/models/todo.model';

interface ITodosContainerProps {}

export const TodosContainer = ({}: ITodosContainerProps) => {
  const { todos, addTodo, removeTodo, toggleTodo } = useTodoStore();

  const handleFormSubmit = (todo: ITodoItem): void => {
    addTodo(todo);
    message.success('Todo added!');
  };

  const handleRemoveTodo = (todo: ITodoItem): void => {
    removeTodo(todo.id);
    message.warning('Todo removed!');
  };

  const handleToggleTodoStatus = (todo: ITodoItem): void => {
    toggleTodo(todo.id);
  };

  return (
    <Row
      justify="center"
      align="middle"
      gutter={[0, 20]}
      className="todos-container"
    >
      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 20 }}
        xl={{ span: 18 }}
      >
        {/* <PageHeader
          title="Add Todo"
          subTitle="To add a todo, just fill the form below and click in add todo."
        /> */}
      </Col>

      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 20 }}
        xl={{ span: 18 }}
      >
        <Card title="Create a new todo">
          <AddTodoForm onFormSubmit={handleFormSubmit} />
        </Card>
      </Col>

      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 20 }}
        xl={{ span: 18 }}
      >
        <Card title="Todo List">
          <TodoList
            todos={todos}
            onTodoRemoval={handleRemoveTodo}
            onTodoToggle={handleToggleTodoStatus}
          />
        </Card>
      </Col>
    </Row>
  );
};
