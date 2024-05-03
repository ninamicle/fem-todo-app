import {useState} from "react";

interface AddTodoProps {
    createTodo: (text: string  ) => void,
}
export default function AddTodo({ createTodo}:AddTodoProps){
    const [text, setText] =
        useState<string>('')
    const handleTodo = () =>{
        if(text) createTodo(text)
    }
    return (
        <div className="flex justify-between items-center text-lightGrayishBlue gap-4 p-6 bg-veryLightGray dark:bg-veryDarkDesaturatedBlueDark rounded-md shadow-2xl">
            <div className="dark:bg-veryDarkGrayishBlueDarker bg-lightGrayishBlue rounded-full p-[1px]">
                <div className="flex justify-center items-center bg-veryLightGray w-6 h-6  rounded-full dark:bg-veryDarkDesaturatedBlueDark"></div>
            </div>
            <input className="dark:bg-veryDarkDesaturatedBlueDark bg-veryLightGray w-full h-6  dark:outline-veryDarkDesaturatedBlueDark outline-darkGrayishBlue outline-[1px] focus:text-veryDarkDesaturatedBlueDark dark:focus:text-lightGrayishBlue"
                   type="text"
                   value={text}
                   placeholder="Create a new todo..."
                   onChange={(e) => setText(e.target.value)}
                   onKeyUp={(e) => {
                       if (e.key === "Enter") {
                           handleTodo();
                           setText('')
                       }
                   }}
            />
    </div>)
}