import nodemailer from "nodemailer"

export const verifyMail = async (token, email) => {
    
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.MAIL_USER,
            pass:process.env.MAIL_PASSWORD
        }
    })
    
    const mailConfigurations = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Email Verification",
        html:<h1>Hey this is just testing email</h1>
    }

    transporter.sendMail(mailConfigurations, function (error, info) {
        if (error) {
           throw new Error(error)
            
        }
        console.log('Email sent successfully');
        
    })

}