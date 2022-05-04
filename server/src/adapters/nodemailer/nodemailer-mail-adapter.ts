import { MailAdapter, SendMailData } from '../mail-adapter'
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '12adfb6b6f1439',
    pass: '26983d847672aa'
  }
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    transport.sendMail({
      from: 'Equipe feedback-widget <oi@feedback-widget.com>',
      to: 'murilera <murilo.rodegheri@gmail.com>',
      subject,
      html: body
    })
  }
}
