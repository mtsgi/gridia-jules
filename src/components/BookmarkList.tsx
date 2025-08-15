import { Component, For, createMemo, Show } from 'solid-js';
import { bookmarks, activeFilter, searchQuery } from '../store';
import BookmarkItem from './BookmarkItem';
import { Bookmark } from '../db';
import './BookmarkList.css';

interface BookmarkListProps {
  onEditBookmark: (bookmark: Bookmark) => void;
}

const BookmarkList: Component<BookmarkListProps> = (props) => {
  const filteredBookmarks = createMemo(() => {
    const filter = activeFilter();
    const query = searchQuery().toLowerCase();
    const allBookmarks = bookmarks();

    if (!allBookmarks) {
      return [];
    }

    // 1. Filter by category or favorites
    let bookmarksByFilter: Bookmark[];
    if (filter === 'all') {
      bookmarksByFilter = allBookmarks;
    } else if (filter === 'favorites') {
      bookmarksByFilter = allBookmarks.filter((b) => b.isFavorite === 1);
    } else {
      // Filter by category ID
      bookmarksByFilter = allBookmarks.filter((b) => b.categoryId === filter);
    }

    // 2. Further filter by search query
    if (!query) {
      return bookmarksByFilter;
    }

    return bookmarksByFilter.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.description.toLowerCase().includes(query) ||
        b.url.toLowerCase().includes(query)
    );
  });

  return (
    <section class="bookmark-list-container">
      <Show
        when={!bookmarks.loading}
        fallback={<p class="loading-message">Loading bookmarks...</p>}
      >
        <div class="bookmark-grid">
          <For
            each={filteredBookmarks()}
            fallback={<p class="fallback-message">No bookmarks found for this filter.</p>}
          >
            {(bookmark) => <BookmarkItem bookmark={bookmark} onEdit={props.onEditBookmark} />}
          </For>
        </div>
      </Show>
    </section>
  );
};

export default BookmarkList;
