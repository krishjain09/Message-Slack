import { mailerQueue } from '../queues/mailer.queue.js'

export const MAILER_PAYLOAD = 'payload:mail'

export const addEmailToQueue = async (payload) => {
  await mailerQueue.add(MAILER_PAYLOAD, payload)
  console.log(`Email added to queue: ${JSON.stringify(payload)}`)
}
