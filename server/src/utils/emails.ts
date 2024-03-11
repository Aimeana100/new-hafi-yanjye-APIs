import { Inject } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as nodemailer from 'nodemailer'

export interface EmailOption {
  to: string
  subject: string
  text: string
}
export class MailService {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  async sendResetEmail(data: EmailOption): Promise<void> {
    // Send reset email
    const transporter = nodemailer.createTransport({
      // Configure your email provider here
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('MAIL_NAME'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    })

    const mailOptions: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('MAIL_NAME'),
      to: data.to,
      subject: data.subject,
      html: data.text,
    }

    transporter.sendMail(mailOptions, (error: any, info: { response: any }) => {
      if (error) {
        console.error('Error sending reset email:', error)
      } else {
        // eslint-disable-next-line no-console
        console.log('Reset email sent:', info.response)
      }
    })
  }
}
