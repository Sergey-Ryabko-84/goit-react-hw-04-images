import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalWrapper } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({img, tags, onCloseModal}) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') onCloseModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCloseModal]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) onCloseModal(null);
  }

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWrapper>
        <img src={img} alt={tags} />
      </ModalWrapper>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
