import './App.css'
import ThemeSwitcher from "./components/ThemeSwitcher.tsx";
import AddTodo from "./components/AddTodo.tsx";
import {Todo} from "./models/Todo.ts";
import Todos from "./components/Todos.tsx";
import {useState} from "react";

let TODOS: Todo[] = [
    {  id: '1',
        text: 'Finire la todo app',
        completed: true
    },
    {  id: '2',
        text: 'Rispettare le linee guida',
        completed: false
    }
]
function App() {
const [todoItems, setTodoItems] = useState<Todo[]>(TODOS)
 const addTodo =(text: string) => {
   setTodoItems( [...todoItems, {id: new Date().toString(), text: text, completed: false } as Todo])
    }
 const updateTodo =(updatedTodo:Todo) => {
    const updatedTodos = [...todoItems];
    const index = updatedTodos.findIndex(todo => todo.id === updatedTodo.id);
    const updatedTodoItem = { ...updatedTodos[index] };
    updatedTodoItem.completed = !updatedTodoItem.completed;
    setTodoItems(updatedTodos)
    }
    const cleaCompleted = () => {
        const updatedTodos = todoItems.filter(todo => !todo.completed);
        TODOS = updatedTodos;
        setTodoItems(updatedTodos);
    }

  return (
      <div className="flex flex-col gap-y-5 mt-16 px-4">
          <div className="flex justify-between items-center text-veryLightGray">
              <h1 className="font-bold text-white tracking-[1rem] text-2xl">TODO</h1>
              <div className="font-bold text-white w-6 h-6">
                  <ThemeSwitcher/>
              </div>
          </div>
          <div>
              <AddTodo createTodo={(text)=>addTodo(text)}/>
          </div>
          <div >
            <Todos todos={todoItems} updateTodo={updateTodo} cleaCompleted={cleaCompleted} setTodos={setTodoItems}/>
          </div>
          <div className="my-4 text-center dark:text-veryDarkGrayishBlueDarker  text-veryDarkGrayishBlueDarker">
              Drag and drop to reorder list
          </div>
      </div>
  )
}

export default App
