import mongoose from "mongoose";


export async function dbConnection() {
        try {
            const connection =  await mongoose.connect(process.env.MONGOURI!,{
                dbName:"nextjs",
                bufferCommands:true
            }) 
            if(connection){
                console.log("database connected")
            }

        } catch (error:any) {
           console.log(error) 
        }
    
}