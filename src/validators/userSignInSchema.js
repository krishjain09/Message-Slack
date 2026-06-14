import zod from 'zod'

export const userSignInSchema = zod.object({
  email: zod.string().email(),
  username: zod.string().min(3),
  password: zod.string().min(6)
})
