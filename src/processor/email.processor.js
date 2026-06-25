import { Worker } from 'bullmq'
import { MAILER_QUEUE } from '../queues/mailer.queue.js'
import { sendEmail } from '../services/mailer.service.js'
import { redisClient } from '../config/redisConfig.js'
export const emailWorker = new Worker(
  MAILER_QUEUE,
  async (job) => {
    console.log(`Processing email job: ${job.id}`)
    const { to, subject, html } = job.data
    // Call the sendEmail function from mailer.service.js
    await sendEmail(to, subject, html)
  },
  {
    connection: redisClient
  }
)
