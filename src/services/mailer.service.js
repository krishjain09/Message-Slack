import { transporter } from '../config/mailerConfig.js'

export async function sendEmail(to, subject, html) {
  try {
    await transporter.sendMail({
      from: process.env.APP_EMAIL,
      to,
      subject,
      html
    })
  } catch (error) {
    console.log('Error in sending mail')
  }
}
