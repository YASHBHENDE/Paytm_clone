import axios from "axios"
import { useEffect, useState } from "react"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { UserCommand } from "./dropdown"




export interface user{
    username:string,
    firstname:string,
    lastname:string,
    _id:string
}

//below to get theuser
// http://localhost:3001/api/v1/user/bulk?filter="+filter


//below to send money to user
/// navigate(`/send?toUser=${_id}&FirstName=${firstname}&LastName=${lastname}`)


export default function SearchBar(){
    const [search,setsearch] = useState("")
    const [payee,setpayee] = useState<user[]>([])

    const getuser = async()=>{
        const response = await axios.get(`http://localhost:3001/api/v1/user/bulk?filter=${search}`)
        setpayee(response.data.users)
        console.log(payee)
    }

    useEffect(()=>{
        getuser()
    },[search])
    return<>
       <Field className="w-1/2">
            <FieldLabel htmlFor="input-button-group">Search user name</FieldLabel>
            
            <Input id="input-button-group" placeholder="Type to search..." onChange={(e)=>{setsearch(e.target.value)}}/>
            <UserCommand payeeNames={payee} />

        
        </Field>
    </>
    
}

