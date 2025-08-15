import { createSignal, createResource } from 'solid-js';
import {
  getAllBookmarks,
  getAllCategories,
  addBookmark as dbAddBookmark,
  deleteBookmark as dbDeleteBookmark,
  updateBookmark as dbUpdateBookmark,
  Bookmark,
  Category,
  NewBookmark,
} from './db';

// --- STATE MANAGEMENT ---

// A signal to hold the current filter.
// 'all' | 'favorites' | categoryId (number)
export const [activeFilter, setActiveFilter] = createSignal<'all' | 'favorites' | number>('all');

// A signal to hold the search query text.
export const [searchQuery, setSearchQuery] = createSignal('');

// A resource to fetch all categories from the database.
// This will automatically handle loading states.
export const [categories, { refetch: refetchCategories }] = createResource<Category[]>(getAllCategories, {
  initialValue: [],
});

// A resource to fetch all bookmarks. It will refetch when the underlying data changes.
export const [bookmarks, { mutate: setBookmarks, refetch: refetchBookmarks }] = createResource<Bookmark[]>(getAllBookmarks, {
  initialValue: [],
});


// --- ACTIONS ---
// These functions perform database operations and then trigger a refetch of the data.

/**
 * Adds a new bookmark to the database and refetches the list.
 * @param bookmark - The bookmark data to add.
 */
export async function addBookmark(bookmark: NewBookmark) {
  await dbAddBookmark(bookmark);
  refetchBookmarks();
}

/**
 * Deletes a bookmark from the database and refetches the list.
 * @param id - The ID of the bookmark to delete.
 */
export async function deleteBookmark(id: number) {
  await dbDeleteBookmark(id);
  // Optimistically remove the bookmark from the list for a faster UI update.
  setBookmarks(bookmarks()?.filter((b) => b.id !== id));
}

/**
 * Updates an existing bookmark in the database and refetches the list.
 * @param bookmark - The bookmark data to update.
 */
export async function updateBookmark(bookmark: Bookmark) {
  await dbUpdateBookmark(bookmark);
  refetchBookmarks();
}

/**
 * Toggles the 'isFavorite' status of a bookmark.
 * @param bookmark - The bookmark to toggle.
 */
export async function toggleFavoriteStatus(bookmark: Bookmark) {
  const updatedBookmark = {
    ...bookmark,
    isFavorite: (bookmark.isFavorite === 1 ? 0 : 1) as 0 | 1,
  };
  await dbUpdateBookmark(updatedBookmark);
  refetchBookmarks();
}
