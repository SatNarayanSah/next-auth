import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'



export const sendEmail = async ({ email, emailType, userId }: any) => {
    //TODO user configurations
    try {
        const hashedToken = await bcryptjs.hash(userId.toSting(), 10)
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }
            )
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 }
            )
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "a9ef99516111c1",
                pass: "4bc265cfa34f2b"
            }
        });

        const mailOption = {
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify Your Email" : "Reset Your Email",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType==="VERIFY" ? "Verify your email address" : "reset you email password"} or copay and paste the link below in your browser <br/> ${process.env.DOMAIN}/verifyemailtoken?token=${hashedToken}  </p>`,
        }

        const mailResponse = await transport.sendMail(mailOption);
        return mailResponse
    } catch (error: any) {
        throw new Error(error?.message)
    }
}