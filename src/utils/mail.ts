import nodemailer, { Transporter } from "nodemailer"
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { DEV_MAILS, MAIL_HOST, MAIL_PASSWORD, MAIL_PORT, MAIL_USER } from "./config";

const transport = nodemailer.createTransport({
  //@ts-ignore
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  }
})

class MailService {

  async send(payload: MailOptions) {
    try {
      await transport.sendMail({
        from: MAIL_USER,
        to: DEV_MAILS,
        ...payload
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default new MailService()