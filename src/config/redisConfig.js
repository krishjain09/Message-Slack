import Redis from 'ioredis'
console.log('Redis created')
export const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  maxRetriesPerRequest: null
})

redisClient.on('connect', () => {
  console.log('Connected to Redis')
})
