import { NextRequest, NextResponse } from "next/server"
import { dbConnection } from "@/utils/db"
import { User } from "@/utils/models/userModel"
import { createHmac } from "crypto"

export const GET = async() =>{

    await dbConnection()
    const userData = await User.find() 
    return new NextResponse(JSON.stringify(userData))
}

export const POST = async(request:NextRequest) =>{

    try {
        await dbConnection();

        const {user,username,password}  =  await request.json();
        if(!user && !username && !password){
            return NextResponse.json({"message":"every field is required"},{status:400})
        }

        const hmac = createHmac('sha256',process.env.SECERTKEY!) ;
        hmac.update(password)

        
        const hashedPassword = await hmac.digest('hex');

        if(!hashedPassword){
            return NextResponse.json({"message":"server error"},{status:500})
        }


        const users = await new User({
            user,
            username,
            password:hashedPassword
        });

        await users.save()    
        return NextResponse.json({"message":"user created"},{status:200})

    } catch (error:any) { 
        return NextResponse.json({"message":error.message},{status:500})
    }

}