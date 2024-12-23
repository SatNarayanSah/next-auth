import { connect } from '@/dbConfig/dbConfib'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helper/Mailer'

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = request.json()
        const { username, email, password } = reqBody
        //validatin
        console.log(reqBody);

        await User.findone({ email })
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save()
        console.log(savedUser);

        //send  varification email
        await sendEmail({email, emailType: "VERIFY", userId:savedUser._id})
        return NextResponse.json({
            message: "User Register Successfully",
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}