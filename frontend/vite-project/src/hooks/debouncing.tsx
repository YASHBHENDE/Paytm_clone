import { use, useEffect, useState } from "react";


export function useDebounce(value:string,delay:number){
    const [debounceValue,setDebounceValue] =useState("")

    useEffect(()=>{
        const timer = setTimeout(() => {
            setDebounceValue(value)
        }, delay);

        return ()=>{clearTimeout(timer)}
    },[value,delay])

    return debounceValue
}