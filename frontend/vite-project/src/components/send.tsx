import axios from "axios"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Send(){
    const [searchParams] = useSearchParams()
    const [amount,setAmount] = useState(0)
    const toUserId = searchParams.get("toUser")
    const username = searchParams.get("Username")
    const navigate = useNavigate()


    return<>
        <center>
            <Card  className="mx-auto w-full max-w-sm mt-40">
                <CardHeader>
                    <CardTitle>{username}</CardTitle>
                </CardHeader>
                <CardContent>
                    <input type="number"  onChange={(e)=>{setAmount(Number(e.target.value))}} placeholder="amount.." className="border border-black"/>
                </CardContent>
                <CardFooter>
                    <Button variant="outline"  className="w-full" onClick={async()=>{
                       
                        if( confirm("confirm transaction") == false){
                            alert("transaction declined")
                            navigate("/dashboard")
                            return
                        }
                        
                        const response = await axios.post("http://localhost:3001/api/v1/account/transfer",{
                            to:toUserId,
                            amount:amount
                        },{headers:{
                            Authorization:"bearer "+localStorage.getItem("token")
                        }})

                        alert(response.data.message)
                        navigate('/dashboard')
                    }}>
                     SEND MONEY
                    </Button>
                </CardFooter>
            </Card>
        </center>
    </>
}


