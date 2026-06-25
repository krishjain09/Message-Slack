import { Queue } from 'bullmq'
import { redisClient } from '../config/redisConfig.js'
export const MAILER_QUEUE = 'queue-mailer'

export const mailerQueue = new Queue(MAILER_QUEUE, {
  connection: redisClient
})
