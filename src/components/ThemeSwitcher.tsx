import {useEffect, useState} from "react";
import iconMoon from "/icon-moon.svg"
import iconSun from "/icon-sun.svg"

type Theme = "light"|"dark"
export default function ThemeSwitcher(){
    const [theme, setTheme]=useState<Theme>("light")
    const toggleTheme=()=>{
        if(theme === "light"){
            setTheme("dark");
            window.localStorage.setItem("theme", "dark");
            document.documentElement.classList.add("dark")
        }else{
            setTheme("light");
            window.localStorage.setItem("theme", "light");
            document.documentElement.classList.remove("dark")
        }
    }

    useEffect(()=>{
        const localTheme=window.localStorage.getItem("theme")  as Theme | null;
        if(localTheme){
            setTheme(localTheme);
            if(localTheme === "dark"){
                document.documentElement.classList.add("dark")
            }else{
                document.documentElement.classList.remove("dark")
            }
        }else if (window.matchMedia("(prefers-color-scheme: dark)").matches){
        setTheme("dark");
        window.localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark")
        }
    },[])

    return (
        <button className="hover:scale-[1.15] transition-all" onClick={()=> toggleTheme()}>
            {theme === "light" ?
                <img className="w-full h-full" src={iconMoon} alt="Activate dark mode"/>
                :
                <img className="w-full h-full" src={iconSun} alt="Activate ligth mode"/>
            }
        </button>
    )
}