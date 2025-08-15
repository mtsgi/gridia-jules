import type { Component } from 'solid-js';
import { For } from 'solid-js';
import { categories, activeFilter, setActiveFilter } from '../store';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onNavigate: () => void;
}

const Sidebar: Component<SidebarProps> = (props) => {
  const handleNavigation = (filter: 'all' | 'favorites' | number) => {
    setActiveFilter(filter);
    props.onNavigate(); // This will close the sidebar on mobile after a selection
  };

  return (
    <aside class="sidebar" classList={{ open: props.isOpen }}>
      <nav class="sidebar-nav">
        <h3 class="sidebar-title">Filters</h3>
        <ul class="sidebar-list">
          <li>
            <button
              class="sidebar-button"
              classList={{ active: activeFilter() === 'all' }}
              onClick={() => handleNavigation('all')}
            >
              All Bookmarks
            </button>
          </li>
          <li>
            <button
              class="sidebar-button"
              classList={{ active: activeFilter() === 'favorites' }}
              onClick={() => handleNavigation('favorites')}
            >
              ★ Favorites
            </button>
          </li>
        </ul>
        <h3 class="sidebar-title">Categories</h3>
        <ul class="sidebar-list">
          <For each={categories()} fallback={<li>Loading categories...</li>}>
            {(category) => (
              <li>
                <button
                  class="sidebar-button"
                  classList={{ active: activeFilter() === category.id }}
                  onClick={() => handleNavigation(category.id)}
                >
                  {category.name}
                </button>
              </li>
            )}
          </For>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
