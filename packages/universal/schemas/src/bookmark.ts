import { z } from 'zod'

// Bookmark represents a unique URL in the system
export const BookmarkSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url(),
  title: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export type Bookmark = z.infer<typeof BookmarkSchema>

export const CreateBookmarkSchema = BookmarkSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type CreateBookmark = z.infer<typeof CreateBookmarkSchema>

export const UpdateBookmarkSchema = CreateBookmarkSchema.partial()

export type UpdateBookmark = z.infer<typeof UpdateBookmarkSchema>
