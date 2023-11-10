'use client'
import React,{ createContext,useContext,useState,useEffect} from 'react'

const ThemeContext = createContext();

export function ThemeProvider({children}:{children: React.ReactNode}) {
    const [mode,setMode] = useState(' ');

    function handleChange(){
        if(mode === 'dark'){
            setMode('light')
            document.documentElement.classList.add('light');
        }else{
            setMode('dark');
            document.documentElement.classList.add('dark')
        }
    }
    useEffect(()=>{
        handleChange()
    },[mode])
    return (
        <ThemeContext.Provider  value={{mode,setMode}} >{children}</ThemeContext.Provider>
    )
}

export function useTheme(){
    const context = useContext(ThemeContext);
    if(context === undefined){
        throw new Error('ThemeContext is undefined');
    }
    return context;
}