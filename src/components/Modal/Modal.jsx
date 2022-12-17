import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');

export default function Modal({ alt, url, closeModal }) {
  const onBackdropClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    const onEscapeClick = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', onEscapeClick);
    return () => {
      window.removeEventListener('keydown', onEscapeClick);
    };
  }, [closeModal]);

  return createPortal(
    <Overlay onClick={onBackdropClick}>
      <ModalWindow>
        <img src={url} alt={alt} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  alt: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
