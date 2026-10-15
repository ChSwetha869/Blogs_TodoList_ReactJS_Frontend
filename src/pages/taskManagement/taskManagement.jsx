import './taskManagement.css'
import TodoList from '../../components/tasks/todoList'
import Theme from '../../components/tasks/theme';
import TodoListwithReducer from '../../components/tasks/todoListwithReducer';
import TodoListwithReducerandContext from '../../components/tasks/todoListwithReducerandContext';
import { TodoProvider } from '../../components/context/todoContext';

function TaskManagement() {

  return (
    <div className='TaskManagement'>
      <Theme />
      <div className="flex justify-center items-center p-8">
        <div className="container">
          <p className='font-bold p-2 text-2xl text-center'>Tasks</p>
          <TodoProvider>
            <TodoListwithReducerandContext />
          </TodoProvider>
        </div>
      </div>
    </div>
  )
}

export default TaskManagement;
