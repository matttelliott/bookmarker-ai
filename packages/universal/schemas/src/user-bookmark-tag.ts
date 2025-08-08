import { z } from 'zod'

// UserBookmarkTag represents a tag applied by a user to their bookmark
export const UserBookmarkTagSchema = z.object({
  id: z.string().uuid(),
  userBookmarkId: z.string().uuid(), // References UserBookmark
  tagId: z.string().uuid(), // References Tag
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export type UserBookmarkTag = z.infer<typeof UserBookmarkTagSchema>

export const CreateUserBookmarkTagSchema = UserBookmarkTagSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type CreateUserBookmarkTag = z.infer<typeof CreateUserBookmarkTagSchema>

export const UpdateUserBookmarkTagSchema = CreateUserBookmarkTagSchema.partial()

export type UpdateUserBookmarkTag = z.infer<typeof UpdateUserBookmarkTagSchema>
