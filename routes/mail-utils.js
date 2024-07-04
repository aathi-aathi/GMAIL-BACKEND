import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'arulaathish6@gmail.com',
        pass: process.env.GMAIL_PASS || '',
    }
})
const mailOptions = {
    from:'aathiaathish32@gmail.com',
    to:['aathivdr2004@gmail.com'],
    subject:'Gmail Sending',
    text:'Sending Mails are so easy'
}

export {transporter,mailOptions}