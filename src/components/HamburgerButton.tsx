import type { Component } from 'solid-js';
import './HamburgerButton.css';

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerButton: Component<HamburgerButtonProps> = (props) => {
  return (
    <button
      class="hamburger-button"
      classList={{ open: props.isOpen }}
      onClick={props.onClick}
      aria-label="Toggle menu"
      aria-expanded={props.isOpen}
    >
      <div class="bar1" />
      <div class="bar2" />
      <div class="bar3" />
    </button>
  );
};

export default HamburgerButton;
