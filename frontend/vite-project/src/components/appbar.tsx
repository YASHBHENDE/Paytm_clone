import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Appbar({username}:{username:string}){
    const navigate =useNavigate()

    return <div className="flex justify-between p-5 ">
        <div className="text-2xl font-bold">
            Paytm
        </div>

        {username != "signin"  &&   <DropdownMenu>
            <DropdownMenuTrigger>
            <Button className="text-xl" variant="ghost">{username}</Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent >
                <DropdownMenuGroup >
                    <DropdownMenuLabel>
                        <Button variant="destructive"  onClick={()=>{
                            localStorage.setItem("token","")
                            navigate('/')
                        }}> Logout </Button> 
                    </DropdownMenuLabel>
                </DropdownMenuGroup>
            </DropdownMenuContent>
            </DropdownMenu>
        }

        {username === "signin"  &&   <Button
            onClick={()=>{
                navigate('/signin')
            }}
          
        >login</Button>
        }
      
    </div>
}
