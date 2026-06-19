import zod from 'zod'

export const createWorkspaceSchema = zod.object({
  name: zod.string().min(3).max(10)
})
