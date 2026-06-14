import zod from 'zod'

export const userSignInSchema = zod.object({
  password: zod.string().min(6),
  username: zod.string().min(2).max(100)
})
