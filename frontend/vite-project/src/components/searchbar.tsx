import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"



interface user{
    username:string,
    firstname:string,
    lastname:string,
    _id:string
}
export default function SearchBar(){
    const[filter,setFilter] = useState('')
    const [Users,SetUsers] = useState([])

    
    async function Search(filter:string) {
        const response = await axios.get("http://localhost:3001/api/v1/user/bulk?filter="+filter)
        console.log(response.data.users)
        SetUsers(response.data.users)
    }

    useEffect(()=>{
        Search(filter)
    },[filter])
    

    return<div >
        <input type="text" placeholder="search..." onChange={(e)=>{setFilter(e.target.value)}} className="w-full border border-black rounded-md mb-4"/>
        
        {/* TODO:implement useDebounce, */}

        <div className="space-y-2 ">
            {Users.map((user:user)=>{
            return <DisplayUser username={user.username} firstname={user.firstname} lastname={user.lastname} _id={user._id} key={user._id} />
            })}
        </div>
    </div>
}


function DisplayUser({username,firstname,lastname,_id}:user){
    const navigate = useNavigate()
    return<div className="border border-black rounded-md flex justify-around bg-gray-200 h-8 p-1">
        <div>{firstname}  {lastname}</div>
        <button className="border rounded-md bg-green-600 " onClick={()=>{
            navigate(`/send?toUser=${_id}&FirstName=${firstname}&LastName=${lastname}`)
        }}>Send Money</button>
    </div>
}