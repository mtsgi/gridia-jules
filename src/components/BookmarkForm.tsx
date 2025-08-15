import { Component, createSignal, For, createEffect } from 'solid-js';
import { addBookmark, updateBookmark, categories } from '../store';
import { Bookmark, NewBookmark } from '../db';
import './BookmarkForm.css';

interface BookmarkFormProps {
  bookmarkToEdit: Bookmark | null;
  onClose: () => void;
}

const BookmarkForm: Component<BookmarkFormProps> = (props) => {
  const [url, setUrl] = createSignal('');
  const [title, setTitle] = createSignal('');
  const [description, setDescription] = createSignal('');
  const [selectedCatId, setSelectedCatId] = createSignal<number | undefined>();

  const isEditMode = () => props.bookmarkToEdit !== null;

  // This effect runs when the `bookmarkToEdit` prop changes.
  // It populates the form for editing or resets it for adding.
  createEffect(() => {
    const bookmark = props.bookmarkToEdit;
    if (bookmark) {
      // Edit mode: set fields from the bookmark
      setUrl(bookmark.url);
      setTitle(bookmark.title);
      setDescription(bookmark.description);
      setSelectedCatId(bookmark.categoryId);
    } else {
      // Add mode: reset fields to default
      setUrl('');
      setTitle('');
      setDescription('');
      const defaultCategory = categories()?.find(c => c.name === 'Uncategorized');
      setSelectedCatId(defaultCategory?.id);
    }
  });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!url().trim() || !title().trim() || selectedCatId() === undefined) {
      alert('URL, Title, and Category are required.');
      return;
    }

    try {
      if (isEditMode()) {
        const updatedBookmark: Bookmark = {
          ...props.bookmarkToEdit!,
          url: url(),
          title: title(),
          description: description(),
          categoryId: selectedCatId()!,
        };
        await updateBookmark(updatedBookmark);
      } else {
        const newBookmark: NewBookmark = {
          url: url(),
          title: title(),
          description: description(),
          categoryId: selectedCatId()!,
          isFavorite: 0,
        };
        await addBookmark(newBookmark);
      }
      props.onClose();
    } catch (error) {
      console.error("Failed to save bookmark:", error);
      alert("Error: Could not save the bookmark. Check the console for details.");
    }
  };

  return (
    <form class="bookmark-form" onSubmit={handleSubmit}>
      <h2>{isEditMode() ? 'Edit Bookmark' : 'Add New Bookmark'}</h2>
      <div class="form-field">
        <label for="url">URL</label>
        <input id="url" type="url" required class="form-input" value={url()} onInput={(e) => setUrl(e.currentTarget.value)} />
      </div>
      <div class="form-field">
        <label for="title">Title</label>
        <input id="title" type="text" required class="form-input" value={title()} onInput={(e) => setTitle(e.currentTarget.value)} />
      </div>
      <div class="form-field">
        <label for="description">Description (Optional)</label>
        <textarea id="description" class="form-textarea" rows="3" value={description()} onInput={(e) => setDescription(e.currentTarget.value)} />
      </div>
      <div class="form-field">
        <label for="category">Category</label>
        <select id="category" class="form-select" value={selectedCatId()} onChange={(e) => setSelectedCatId(parseInt(e.currentTarget.value, 10))}>
          <For each={categories()} fallback={<option>Loading...</option>}>
            {(category) => <option value={category.id}>{category.name}</option>}
          </For>
        </select>
      </div>
      <div class="form-actions">
        <button type="button" class="button-secondary" onClick={props.onClose}>Cancel</button>
        <button type="submit" class="button-primary">{isEditMode() ? 'Save Changes' : 'Add Bookmark'}</button>
      </div>
    </form>
  );
};

export default BookmarkForm;
