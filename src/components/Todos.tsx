import {Todo} from "../models/Todo.ts";
import TodoItem from "./Todo.tsx";
import React, {useEffect, useState} from "react";
import {
    closestCorners,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from '@dnd-kit/sortable';
import useWindowDimensions from "../hooks/useWindowDimensions.ts";

interface TodosProps{
    todos: Todo[];
    updateTodo: (todo: Todo) => void;
    deleteTodo: (id: string) => void;
    setTodos: (todo: Todo[]) => void;
    cleaCompleted: () => void;
}
const Todos: React.FC<TodosProps> =({todos, updateTodo, deleteTodo, cleaCompleted, setTodos}) => {
    const [todoItems, setTodoItems] = useState<Todo[]>(todos)
    const [activeStatus, setActiveStatus] = useState<"all" | "active" | "completed">("all")
    const {width} = useWindowDimensions();
    const toggleTodo = (todoId: string) => {
        const todo = todos.filter(todo => todo.id === todoId)
            .map(todo => ({...todo, completed: todo.completed = !todo.completed} as Todo));
        return updateTodo(todo[0] as Todo)
    }
    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 0.1
        }
    });
    const touchSensor = useSensor(TouchSensor);
    const keyboardSensor = useSensor(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates})
    const sensors = useSensors(pointerSensor, touchSensor, keyboardSensor)

    const getTaskProps = (taskId: string) => todoItems.findIndex(todo => todo.id === taskId)
    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        if (active.id === over?.id) {
            return;
        }
        const originalPOs = getTaskProps(active.id as string);
        const newPos = getTaskProps(over?.id as string);
        const newTodos = arrayMove(todoItems, originalPOs, newPos);
        setTodos(newTodos);
    }
    useEffect(() => {
        setTodoItems(todos)
    }, [todos]);
    return (
        <div className="shadow-2xl rounded-md">
            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd} sensors={sensors}>
                <SortableContext items={todoItems} strategy={verticalListSortingStrategy}>
                    <div className={`${todoItems.length > 4 ? 'h-[45vh]' : 'h-auto'} overflow-y-scroll no-scrollbar`}>
                        {todoItems.map((todoItem, index) =>
                            <div key={todoItem.id}
                                 className="flex gap-4 bg-veryLightGray dark:bg-veryDarkDesaturatedBlueDark  first:rounded-t-md border-b dark:border-b-veryDarkGrayishBlueDarker border-b-lightGrayishBlue last:border-none p-6 touch-none">
                                <TodoItem index={index} todo={todoItem} toggleTodo={(toggle) => toggleTodo(toggle)} deleteTodo={deleteTodo}/>
                            </div>
                        )}
                    </div>
                </SortableContext>
            </DndContext>

            {width >= 700 ?
                <div className="flex justify-between gap-4 bg-veryLightGray dark:bg-veryDarkDesaturatedBlueDark
                     border-collapse rounded-b-md p-6">
                    <div
                        className="dark:text-lightGrayishBlue text-veryDarkDesaturatedBlueDark">{todoItems.length} items
                        left
                    </div>
                    <div className="flex gap-3 transition-all">
                        <div onClick={() => (
                            setTodoItems(todos),
                                setActiveStatus('all')
                        )}
                             className={`${activeStatus === 'all' ? 'text-brightBlue' : 'dark:text-lightGrayishBlue text-veryDarkDesaturatedBlueDark'} cursor-pointer`}
                        >All
                        </div>
                        <div onClick={() => (
                            setTodoItems(todos.filter((todo) => !todo.completed)),
                                setActiveStatus('active')
                        )}
                             className={`${activeStatus === 'active' ? 'text-brightBlue' : 'dark:text-lightGrayishBlue text-veryDarkDesaturatedBlueDark'} cursor-pointer`}
                        >Active
                        </div>
                        <div onClick={() => (
                            setTodoItems(todos.filter((todo) => todo.completed)),
                                setActiveStatus('completed')
                        )}
                             className={`${activeStatus === 'completed' ? 'text-brightBlue' : 'dark:text-lightGrayishBlue text-veryDarkDesaturatedBlueDark'} cursor-pointer`}
                        >Completed
                        </div>
                    </div>
                    <div onClick={() => cleaCompleted()}
                         className={`${!todoItems.some((todo: Todo) => todo.completed) ? 'text-veryDarkGrayishBlueDarker' : 'dark:text-lightGrayishBlue text-veryDarkDesaturatedBlueDark cursor-pointer'} `}
                    >Clear Completed
                    </div>
                </div>
                :
                <div className="flex flex-col gap-y-4">
                    <div className="flex justify-between bg-veryLightGray dark:bg-veryDarkDesaturatedBlueDark border-collapse rounded-b-md p-6">
                        <div className="dark:text-lightGrayishBlue text-veryDarkDesaturatedBlueDark">{todoItems.length} items left </div>
                        <div onClick={() => cleaCompleted()}
                             className={`${!todoItems.some((todo: Todo) => todo.completed) ? 'text-veryDarkGrayishBlueDarker' : 'dark:text-lightGrayishBlue text-veryDarkDesaturatedBlueDark cursor-pointer'} `}
                        >Clear Completed
                        </div>
                    </div>
                    <div className="flex gap-3 justify-center bg-veryLightGray dark:bg-veryDarkDesaturatedBlueDark border-collapse rounded-md p-6">
                        <div onClick={() => (
                            setTodoItems(todos),
                                setActiveStatus('all')
                        )}
                             className={`${activeStatus === 'all' ? 'text-brightBlue' : 'dark:text-lightGrayishBlue text-veryDarkDesaturatedBlueDark'} cursor-pointer`}
                        >All
                        </div>
                        <div onClick={() => (
                            setTodoItems(todos.filter((todo) => !todo.completed)),
                                setActiveStatus('active')
                        )}
                             className={`${activeStatus === 'active' ? 'text-brightBlue' : 'dark:text-lightGrayishBlue text-veryDarkDesaturatedBlueDark'} cursor-pointer`}
                        >Active
                        </div>
                        <div onClick={() => (
                            setTodoItems(todos.filter((todo) => todo.completed)),
                                setActiveStatus('completed')
                        )}
                             className={`${activeStatus === 'completed' ? 'text-brightBlue' : 'dark:text-lightGrayishBlue text-veryDarkDesaturatedBlueDark'} cursor-pointer`}
                        >Completed
                        </div>
                    </div>
                </div>

}

</div>)
}
export default Todos