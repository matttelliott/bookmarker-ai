import { z } from 'zod'

// BookmarkTag tracks how many times a tag has been applied to a bookmark
export const BookmarkTagSchema = z.object({
  id: z.string().uuid(),
  bookmarkId: z.string().uuid(), // References Bookmark
  tagId: z.string().uuid(), // References Tag
  count: z.number().int().positive(), // How many users have applied this tag
  lastAppliedAt: z.string().datetime(), // For tracking trending/recent activity
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export type BookmarkTag = z.infer<typeof BookmarkTagSchema>

export const CreateBookmarkTagSchema = BookmarkTagSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type CreateBookmarkTag = z.infer<typeof CreateBookmarkTagSchema>

export const UpdateBookmarkTagSchema = CreateBookmarkTagSchema.partial()

export type UpdateBookmarkTag = z.infer<typeof UpdateBookmarkTagSchema>
