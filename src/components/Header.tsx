import type { Component } from 'solid-js';
import { searchQuery, setSearchQuery } from '../store';
import HamburgerButton from './HamburgerButton';
import './Header.css';

interface HeaderProps {
  onAddBookmark: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: Component<HeaderProps> = (props) => {
  return (
    <header class="app-header">
      <div class="header-left">
        <HamburgerButton
          isOpen={props.isSidebarOpen}
          onClick={props.onToggleSidebar}
        />
        <h1 class="app-title">Gridia</h1>
      </div>
      <div class="search-container">
        <input
          type="search"
          placeholder="Search bookmarks..."
          class="search-input"
          value={searchQuery()}
          onInput={(e) => setSearchQuery(e.currentTarget.value)}
        />
      </div>
      <button class="add-bookmark-button" onClick={props.onAddBookmark}>
        + Add Bookmark
      </button>
    </header>
  );
};

export default Header;
