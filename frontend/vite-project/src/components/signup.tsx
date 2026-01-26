import axios from "axios"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

export default function Signup(){
    const [username,setusername] = useState('')
    const [firstname,setfirstname] = useState('')
    const [lastname,setlastname] = useState('')
    const [password,setpassword] = useState('')

   
    const navigate = useNavigate()

    const inputFieldStyle = "border border-black rounded-sm"
    return <>
    <center>
        <div className="flex flex-col h-85 w-100 border border-2 border-black rounded-xl p-4 space-y-3 m-10">

            Signup!
            <input placeholder=" username"  onChange={(e)=>{setusername(e.target.value)}} className={inputFieldStyle}/>
            <input placeholder=" firstname" onChange={(e)=>{setfirstname(e.target.value)}}  className={inputFieldStyle}/>
            <input placeholder=" lastname" onChange={(e)=>{setlastname(e.target.value)}} className={inputFieldStyle}/>
            <input placeholder=" password" onChange={(e)=>{setpassword(e.target.value)}} className={inputFieldStyle}/>
            <button onClick={async()=>{
                const response= await axios.post("http://localhost:3001/api/v1/user/signup",{
                    username,
                    firstname,
                    lastname,
                    password
                })

                localStorage.setItem("token",response.data.token)
                navigate('/dashboard')
            }} className="bg-black text-white rounded-xl ">Signup</button>
            already have account? <button 
                onClick={()=>{navigate('/signin')}} 
                className="bg-gray-300 rounded-2xl"
            >log in</button>
        </div>
        </center>
    </>
}