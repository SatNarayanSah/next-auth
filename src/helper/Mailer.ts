import nodemailer from 'nodemailer'

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {

        //TODO user configurations

        
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: "maddison53@ethereal.email",
                pass: "jn7jnAPss4f63QBp6D",
            },
        });


        const mailOption = {
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify Your Email" : "Reset Your Email",
            html: "<b>Hello world?</b>",
        }

        const mailResponse = await transporter.sendMail(mailOption);
        return mailResponse
    } catch (error: any) {
        throw new Error(error?.message)
    }
}