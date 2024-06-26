import './App.css'
import ThemeSwitcher from "./components/ThemeSwitcher.tsx";
import AddTodo from "./components/AddTodo.tsx";
import {Todo} from "./models/Todo.ts";
import Todos from "./components/Todos.tsx";
import {useEffect, useState} from "react";

function App() {
    const todos = localStorage.todos && JSON.parse(localStorage.todos);
    const [todoItems, setTodoItems] = useState<Todo[]>(todos as unknown as Todo[] ?? [])
    const addTodo =(text: string) => {
        setTodoItems([{id: String(Math.random()), text: text, completed: false }, ...todoItems])
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
        setTodoItems(updatedTodos);
    }
    const deleteTodo= (id: string) => {
        const updatedTodos = todoItems.filter(todo => todo.id !== id);
        setTodoItems(updatedTodos);
    }
    useEffect(() => {
        if(todoItems){
            localStorage.setItem('todos',JSON.stringify(todoItems));
        }
    }, [todoItems]);

  return (
      <div className="flex flex-col gap-y-5 mt-16">
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
            <Todos todos={todoItems} updateTodo={updateTodo} cleaCompleted={cleaCompleted} setTodos={setTodoItems} deleteTodo={(id)=> deleteTodo(id)}/>
          </div>
          <div className="text-sm text-center dark:text-veryDarkGrayishBlueDarker  text-veryDarkGrayishBlueDarker">
              Drag and drop to reorder list
          </div>
      </div>
  )
}

export default App
