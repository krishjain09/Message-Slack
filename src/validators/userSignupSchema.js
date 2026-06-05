import zod from 'zod'

export const userSignupSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
  username: zod.string().min(2).max(100)
})
