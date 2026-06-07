'use client'
import { useEffect, useRef, useState } from "react";
const OTP=()=>{
    const  refs= useRef(new Array(6).fill(null));
    const [state,setState]= useState(new Array(6).fill(''));
    const [index,setIndex]= useState(0);
    const handleChange=(e:any,index:number)=>{
        const value=e.target.value;
        const trimmedValue=value.slice(0,1);
        const newState=[...state];
        newState[index]=trimmedValue;
        setState(newState);
        if(trimmedValue && index<5){
            setIndex(index+1);
        }
    }

    const handleKeyDown=(e:any,index:number)=>{
        if(e.key==='Backspace' && !state[index] && index>0){
            setIndex((prev)=>prev-1);
        }
    }
    useEffect(()=>{
        refs?.current[index]?.focus();
    },[index])

    return(
        <div className="flex items-center justify-center gap-2 mt-10">
            {Array.from({length:6}).map((_,index)=>{
                return(
                    <div key={index} className="h-10 w-10"><input ref={(el)=>{refs.current[index]=el}} value={state[index]}  id={`otp-${index}`} type="text" className="h-full w-full border border-bl
                    " onChange={(e)=>handleChange(e,index)} onKeyDown={(e)=>handleKeyDown(e,index)}/></div>
                )
            })}
        </div>
    )
}

export default OTP;