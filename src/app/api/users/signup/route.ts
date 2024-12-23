import {connect} from '@/dbConfig/dbConfib'
import User from '@/models/userModel'
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = request.json()
        const {username, email, password} = reqBody
        //validatin
        console.log(reqBody);
        
        await User.findone({email})
        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}