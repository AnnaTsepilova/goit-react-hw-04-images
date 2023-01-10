import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Overlay, ModalWindow } from 'components/Modal/Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onModalClose, children }) {
  const handleKeydown = event => {
    if (event.code === 'Escape') {
      onModalClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onModalClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
  });

  useEffect(() => {
    window.removeEventListener('keydown', handleKeydown);
  });

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  handleBackdropClick: PropTypes.func,
  handleKeydown: PropTypes.func,
};
