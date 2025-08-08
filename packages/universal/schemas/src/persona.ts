import { z } from 'zod'

export const PersonaSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  systemPrompt: z.string().min(1),
  userId: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export type Persona = z.infer<typeof PersonaSchema>

export const CreatePersonaSchema = PersonaSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type CreatePersona = z.infer<typeof CreatePersonaSchema>

export const UpdatePersonaSchema = CreatePersonaSchema.partial()

export type UpdatePersona = z.infer<typeof UpdatePersonaSchema>
