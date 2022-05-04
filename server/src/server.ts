import { prisma } from './prisma'
import express from 'express'
import nodemailer from 'nodemailer'

const app = express()

app.use(express.json())

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '12adfb6b6f1439',
    pass: '26983d847672aa'
  }
})

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot
    }
  })

  transport.sendMail({
    from: 'Equipe feedback-widget <oi@feedback-widget.com>',
    to: 'murilera <murilo.rodegheri@gmail.com>',
    subject: 'Novo Feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`
    ].join('\n')
  })

  res.status(201).json({
    success: true,
    data: feedback
  })
})

const port = 3333
app.listen(port, () => {
  console.log(`server listening on port: ${port}`)
})
