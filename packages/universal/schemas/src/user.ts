import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  username: z.string().min(3),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export type User = z.infer<typeof UserSchema>

export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type CreateUser = z.infer<typeof CreateUserSchema>

export const UpdateUserSchema = CreateUserSchema.partial()

export type UpdateUser = z.infer<typeof UpdateUserSchema>
