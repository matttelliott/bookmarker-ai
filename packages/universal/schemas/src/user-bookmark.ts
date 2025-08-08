import { z } from 'zod'

// UserBookmark represents a user's relationship with a bookmark
export const UserBookmarkSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  bookmarkId: z.string().uuid(),
  notes: z.string().nullable().default(null), // Always private
  isPublic: z.boolean().default(false), // Whether others can see this user bookmarked this URL
  personaId: z.string().uuid().nullable().default(null), // Which persona (if any) suggested tags
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export type UserBookmark = z.infer<typeof UserBookmarkSchema>

export const CreateUserBookmarkSchema = UserBookmarkSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type CreateUserBookmark = z.infer<typeof CreateUserBookmarkSchema>

export const UpdateUserBookmarkSchema = CreateUserBookmarkSchema.partial()

export type UpdateUserBookmark = z.infer<typeof UpdateUserBookmarkSchema>
