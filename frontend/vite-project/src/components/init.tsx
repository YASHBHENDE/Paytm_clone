import { useEffect, useState } from "react";
import axios from "axios";




interface UserDetail{
    balance:number,
    detail:{
        
        username:string,
        lastname:string,
        firstname:string,

    }

}
export default function InitUser(){

     const [user,setUser] = useState<UserDetail>()

    const GetUserDetail = async  () => {
        const response = await axios.get("http://localhost:3001/api/v1/user/me",{headers:{Authorization:"bearer "+localStorage.getItem("token")}})
        setUser(response.data)
        console.log(user)
    }

    useEffect(()=>{
        GetUserDetail()
    },[])
    return<></>
}