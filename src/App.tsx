import { Component, createSignal } from 'solid-js';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BookmarkList from './components/BookmarkList';
import Modal from './components/Modal';
import BookmarkForm from './components/BookmarkForm';
import { Bookmark } from './db';
import './App.css';

const App: Component = () => {
  const [editingBookmark, setEditingBookmark] = createSignal<Bookmark | null>(null);
  const [isFormOpen, setIsFormOpen] = createSignal(false);
  const [isSidebarOpen, setIsSidebarOpen] = createSignal(false);

  const openAddForm = () => {
    setEditingBookmark(null);
    setIsFormOpen(true);
  };

  const openEditForm = (bookmark: Bookmark) => {
    setEditingBookmark(bookmark);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setTimeout(() => setEditingBookmark(null), 300);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen());
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div class="app-container">
      <Header
        onAddBookmark={openAddForm}
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen()}
      />
      <main class="main-content">
        <Sidebar isOpen={isSidebarOpen()} onNavigate={closeSidebar} />
        <BookmarkList onEditBookmark={openEditForm} />
      </main>
      <Modal isOpen={isFormOpen()} onClose={closeForm}>
        <BookmarkForm
          bookmarkToEdit={editingBookmark()}
          onClose={closeForm}
        />
      </Modal>
    </div>
  );
};

export default App;
