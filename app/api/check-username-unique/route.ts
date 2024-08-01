import dbConnect from "@/lib/dbConnect";
import { z } from "zod";
import UserModel from "@/model/User";
import { usernameValidation } from "@/schemas/signUpSchema";

//query schema/check the syntax of particular object ...
const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request){
    await dbConnect()
       
    try {
        const {searchParams} = new URL(request.url)
        const queryParam = {
            username: searchParams.get('username')
        }
        //validate with zod
        const result = UsernameQuerySchema.safeParse(queryParam)
        console.log("result is ", result)
        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                success: false,
                message: "Invalid Query Parameters"
            },{
                status: 400
            })
        }

        const {username} = result.data
        const existingVerifiedUser = await UserModel.findOne({username, isVerified: true})

        if(existingVerifiedUser){
            return Response.json({
                success: false,
                message: "Username is already taken"
            },{
                status: 400
            })
        }

        return Response.json({
            success: true,
            message: "Username is unique"
        },{
            status: 400
        })

    } catch (error) {
        console.error("Erorr checking username", error);
        return Response.json({
            success: false,
            message: "Error checking username"
        },{
            status: 500
        })
    }
}