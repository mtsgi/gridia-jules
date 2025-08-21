import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { addCategory } from '../store';
import './CategoryForm.css';

const CategoryForm: Component = () => {
  const [name, setName] = createSignal('');
  const [error, setError] = createSignal('');

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const categoryName = name().trim();
    if (!categoryName) {
      setError('Category name cannot be empty.');
      return;
    }
    try {
      await addCategory(categoryName);
      setName('');
      setError('');
    } catch (err) {
      console.error('Failed to add category:', err);
      if (err instanceof Error && err.message.includes('ConstraintError')) {
        setError('This category name already exists.');
      } else {
        setError('Failed to add category. Please try again.');
      }
    }
  };

  return (
    <form class="category-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name()}
        onInput={(e) => setName(e.currentTarget.value)}
        placeholder="New Category Name"
        class="category-input"
        aria-label="New category name"
      />
      <button type="submit" class="category-submit-button">
        +
      </button>
      {error() && <p class="category-form-error">{error()}</p>}
    </form>
  );
};

export default CategoryForm;
