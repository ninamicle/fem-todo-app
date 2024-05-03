import {useEffect, useState} from "react";

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
                <img className="w-full h-full" src={'src/assets/icon-moon.svg'} alt="Activate dark mode"/>
                :
                <img className="w-full h-full" src={'src/assets/icon-sun.svg'} alt="Activate ligth mode"/>
            }
        </button>
    )
}