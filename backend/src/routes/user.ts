import express from "express"
import z, { string } from "zod"
import { Account, User } from "../db"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { AuthRequest, UserMiddleware } from "./middleware"
import { Jwt_Secret } from "../config";

const router = express.Router()


const userInput = z.object({
    username:z.string(),
    firstname:z.string(),
    lastname:z.string(),
    password:z.string()

})

router.post("/signup",async(req,res)=>{
    const {username,firstname,lastname,password} = req.body

    const parsedInput = userInput.safeParse(req.body)

    if(!parsedInput.success){
        res.json({
            "msg":"invalid user input",
            "error":parsedInput.error
        })
        return 
    }

    const userExists = await User.findOne({username:username})

    if(userExists){
        res.json({
            "msg":"user already exists"
        })
        return
    }

    const hashedPassword = await bcrypt.hash(password,3)
    
    const newUser = await User.create({username,firstname,lastname,password:hashedPassword})

    await Account.create({
        userId:newUser.id,
        balance: 10000
    })
    const token = jwt.sign({userId:newUser.id},Jwt_Secret)

    res.json({
        "msg":"User created suceesfully",
        "token":token
    })
})

const SigninUserInput = z.object({
    username:z.string(),
    password:z.string()
})

router.post("/signin",async(req,res)=>{
    const {username,password}:{username:string,password:string} = req.body

    const parsedInput = SigninUserInput.safeParse(req.body)

    if(!parsedInput.success){
        res.json({
            "msg":"invalid user input",
            "erro":parsedInput.error
        })
        return 
    }

    const userExists = await User.findOne({username})
    if(!userExists  || !userExists.password){
        res.json({
            "msg":"user does not exists"
        })
        return
    }

    const checkPassword = await bcrypt.compare(password, userExists.password)

    if(!checkPassword){
        res.json({
            "msg":"invalid authentication"

        })
        return
    }

    const token = jwt.sign({userId:userExists.id},Jwt_Secret)
    res.json({
        "msg":"user logged in succeessfully",
        "token":token
    })

})

const UpdateUserInput = z.object({
    password:z.string().optional(),
    firstname:z.string().optional(),
    lastname:z.string().optional()
})
router.put("/",UserMiddleware,async(req:AuthRequest,res)=>{
    const {password,firstname,lastname} = req.body

    const parsed = UpdateUserInput.safeParse(req.body)

    if(!parsed.success){
        res.json({
            "msg":"invalid input"
        })
    }
    const userid = req.userId

    const updateUser= await User.findByIdAndUpdate(userid,{firstname,password,lastname})
    await updateUser?.save()

    res.json({"user":updateUser})

})
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter?.toString().trim() || "";
   

    try {
               
        const testUser = await User.findOne({ firstname: { $regex: filter, $options: "i" } });

        const users = await User.find({
            $or: [
                { firstname: { $regex: filter, $options: "i" } },
                { lastname: { $regex: filter, $options: "i" } }
            ]
        })

        res.json({
            users: users.map(user => ({
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                _id: user._id
            }))
        });
    } catch (error) {
        console.error("Error in /bulk route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/me",UserMiddleware,async(req:AuthRequest,res)=>{
    const userId = req.userId
    console.log(userId)
    const AccountDetail = await Account.findOne({userId:userId})
    const UserDetail = await User.findOne({_id:userId})

    console.log(AccountDetail)
    res.json({
        "balance":AccountDetail?.balance,
        "detail":{
            firstname:UserDetail?.firstname,
            lastname:UserDetail?.lastname,
            username:UserDetail?.username,
            
        }
    })
})
export default router