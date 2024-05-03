import React from "react";
import {Todo} from "../models/Todo.ts";
import {useSortable} from "@dnd-kit/sortable";
import checkImg from "/icon-check.svg"
interface TodoItemProps{
    todo: Todo;
    toggleTodo: (id: string) => void;
    index: number;
}
const TodoItem:React.FC<TodoItemProps> = ({todo, toggleTodo}) => {
    const { attributes, listeners, setNodeRef, transform,isDragging } = useSortable({
        id: todo.id
    });
    const style =transform && {
        transform:`translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: isDragging ? 1 : 'auto',
    };
    return (
        <div
            ref={setNodeRef} style={style ? style : undefined} {...attributes} {...listeners}
            className="flex dark:text-lightGrayishBlue text-veryDarkDesaturatedBlueDark gap-4 items-center ">
            <div className="hover:bg-checkBackground dark:bg-veryDarkGrayishBlueDarker bg-lightGrayishBlue rounded-full p-[1px] cursor-pointer">
                {todo.completed ?
                    <div className="flex justify-center items-center bg-checkBackground w-6 h-6  rounded-full"
                         onClick={() => {
                             return toggleTodo(todo.id)
                         }}>
                        <img className="w-4 h-4" src={checkImg} alt="Todo status"/>
                    </div>
                    :
                    <div
                        className="flex justify-center items-center bg-veryLightGray w-6 h-6 rounded-full dark:bg-veryDarkDesaturatedBlueDark"
                        onClick={() => toggleTodo(todo.id)}
                    >
                    </div>
                }
            </div>
            <div className={`font-normal ${todo.completed ? 'line-through text-veryDarkGrayishBlueDarker' : ''}`}>{todo.text}</div>
        </div>
    )
}
export default TodoItem