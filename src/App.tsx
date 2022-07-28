import { useRef, useState } from 'react';

import { TodoType } from '@components/Todo';
import Todos from '@components/Todos';
import TodosPresenter from '@presenters/todosPresenter';

const todosPresenter = new TodosPresenter([{ id: 1, title: 'ㅎㅇ' }]);

const App: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<TodoType[]>(todosPresenter.getTodos());

  const handleClickDeleteTodo = (todoId) => {
    todosPresenter.delete(todoId, setTodos);
  };

  const handleClickAddTodo = () => {
    if (!inputRef.current) return;
    const title = inputRef.current.value;
    todosPresenter.add(title, setTodos);
  };

  return (
    <div>
      <h1>Hello World</h1>
      <input ref={inputRef} type="text" />
      <button type="button" onClick={handleClickAddTodo}>
        생성
      </button>
      <Todos todos={todos} onClickDeleteTodo={handleClickDeleteTodo} />
    </div>
  );
};

export default App;
