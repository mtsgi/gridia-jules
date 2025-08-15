import { Component, Show, JSX, onCleanup, onMount } from 'solid-js';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
}

const Modal: Component<ModalProps> = (props) => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      props.onClose();
    }
  };

  onMount(() => {
    document.addEventListener('keydown', handleEscape);
  });

  onCleanup(() => {
    document.removeEventListener('keydown', handleEscape);
  });

  return (
    <Show when={props.isOpen}>
      <div class="modal-overlay" onClick={props.onClose}>
        <div class="modal-content" onClick={(e) => e.stopPropagation()}>
          <button class="modal-close-button" onClick={props.onClose}>
            &times;
          </button>
          {props.children}
        </div>
      </div>
    </Show>
  );
};

export default Modal;
