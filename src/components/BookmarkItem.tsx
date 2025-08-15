import type { Component } from 'solid-js';
import { Bookmark } from '../db';
import { deleteBookmark, toggleFavoriteStatus } from '../store';
import './BookmarkItem.css';

interface BookmarkItemProps {
  bookmark: Bookmark;
  onEdit: (bookmark: Bookmark) => void;
}

const BookmarkItem: Component<BookmarkItemProps> = (props) => {
  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${props.bookmark.title}"?`)) {
      try {
        await deleteBookmark(props.bookmark.id);
      } catch (error) {
        console.error("Failed to delete bookmark:", error);
        alert("Error: Could not delete the bookmark.");
      }
    }
  };

  const handleEdit = () => {
    props.onEdit(props.bookmark);
  };

  const handleToggleFavorite = async () => {
    try {
      await toggleFavoriteStatus(props.bookmark);
    } catch (error) {
      console.error("Failed to toggle favorite status:", error);
      alert("Error: Could not update favorite status.");
    }
  };

  return (
    <div class="bookmark-item">
      <div class="bookmark-item-content">
        <a href={props.bookmark.url} target="_blank" rel="noopener noreferrer" class="bookmark-item-main-link">
          <h3>{props.bookmark.title}</h3>
          <p class="bookmark-item-url">{props.bookmark.url}</p>
        </a>
        <p class="bookmark-item-description">{props.bookmark.description}</p>
      </div>
      <div class="bookmark-item-actions">
        <button
          class="action-button favorite-button"
          classList={{ favorited: props.bookmark.isFavorite === 1 }}
          onClick={handleToggleFavorite}
          title={props.bookmark.isFavorite === 1 ? 'Remove from favorites' : 'Add to favorites'}
        >
          {props.bookmark.isFavorite === 1 ? '★' : '☆'}
        </button>
        <button class="action-button edit-button" onClick={handleEdit}>
          Edit
        </button>
        <button class="action-button delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookmarkItem;
