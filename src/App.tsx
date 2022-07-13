import { useRef, useState } from 'react';

import { TodoType } from '@components/Todo';
import Todos from '@components/Todos';

const App: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<TodoType[]>([{ id: 1, title: 'ㅎㅇ' }]);

  const handleClickDeleteTodo = (todoId) => {
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
  };

  return (
    <div>
      <h1>Hello World</h1>
      <input ref={inputRef} type="text" />
      <button
        type="button"
        onClick={() => {
          if (!inputRef.current) return;
          const lastTodo = todos.at(-1);
          const newId = lastTodo ? lastTodo.id + 1 : 1;
          const newTodo = {
            id: newId,
            title: inputRef?.current?.value,
          };
          setTodos([...todos, newTodo]);
        }}
      >
        생성
      </button>
      <Todos todos={todos} onClickDeleteTodo={handleClickDeleteTodo} />
    </div>
  );
};

export default App;
