import React from 'react';
import './App.scss';
import { Container, Row, Col } from 'react-bootstrap';
import TextField from './components/TextField';
import Button from './components/Button';
import todo from './store/todo/todo';
import { observer } from 'mobx-react-lite';

interface UserAction {
  value: string;
  error: boolean;
  typeFilter: string;
}

const App = observer(() => {
  const [userAction, setUserAction] = React.useState<UserAction>({
    value: '',
    error: false,
    typeFilter: 'all',
  });

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAction({ ...userAction, value: event.target.value });
  };

  const onClickFilter = (type: string) => {
    setUserAction({ ...userAction, typeFilter: type });
  };

  const onClickAdd = () => {
    if (userAction.value !== '') {
      setUserAction({ ...userAction, error: false });
      todo.addTodo({ id: todo.todos.length + 1, text: userAction.value, completed: false });
    } else {
      setUserAction({ ...userAction, error: true });
    }
  };

  return (
    <Container className="pt-5 pb-5">
      <Row className="gy-4">
        <Col lg={8} xl={8}>
          <TextField onChangeInput={onChangeInput} placeholder="task for me" />
        </Col>
        <Col lg={4} xl={4}>
          <Button onClickButton={onClickAdd} sx={{ fontSize: '32px' }} text="add" />
        </Col>
      </Row>
      {userAction.error && (
        <Row className="mt-4">
          <Col xl={12}>
            <p className="error">Error: text field is empty</p>
          </Col>
        </Row>
      )}
      <Row className="justify-content-center mt-4 mb-5 gy-4">
        <Col sx={6} md={6} lg={2} xl={2}>
          <Button
            onClickButton={() => onClickFilter('all')}
            sx={{ padding: '1rem 0' }}
            text="all"
          />
        </Col>
        <Col sx={6} md={6} lg={2} xl={2}>
          <Button
            onClickButton={() => onClickFilter('completed')}
            sx={{ padding: '1rem 0' }}
            text="completed"
          />
        </Col>
        <Col sx={6} md={6} lg={2} xl={2}>
          <Button
            onClickButton={() => onClickFilter('incomplete')}
            sx={{ padding: '1rem 0' }}
            text="incomplete"
          />
        </Col>
      </Row>
      {todo !== undefined &&
        todo.filterTodo(userAction.typeFilter).map((item) => (
          <Row className="mt-4 mb-4 gy-4 justify-content-center">
            <Col className="d-flex align-items-center" key={item.id} lg={9} xl={9}>
              <span className={item.completed ? 'completed' : 'task'}>{item.text}</span>
            </Col>
            <Col sx={4} md={4} lg={1} xl={1}>
              <Button
                onClickButton={() => todo.completeTodo(item.id)}
                sx={{ padding: '0.5rem 0' }}
                text={item.completed ? 'start' : 'end'}
              />
            </Col>
            <Col sx={4} md={4} lg={2} xl={2}>
              <Button
                onClickButton={() => todo.removeTodo(item.id)}
                sx={{ background: '#f96767', color: '#FFCCCC', padding: '0.5rem 0' }}
                text="delete"
              />
            </Col>
          </Row>
        ))}
    </Container>
  );
});

export default App;
