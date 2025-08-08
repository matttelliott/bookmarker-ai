import { z } from 'zod'

// Tag represents a unique tag in the system (global)
export const TagSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1), // Normalized (lowercase, trimmed)
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export type Tag = z.infer<typeof TagSchema>

export const CreateTagSchema = TagSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type CreateTag = z.infer<typeof CreateTagSchema>

export const UpdateTagSchema = CreateTagSchema.partial()

export type UpdateTag = z.infer<typeof UpdateTagSchema>
