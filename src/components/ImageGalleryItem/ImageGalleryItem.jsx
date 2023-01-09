import { useState } from 'react';
import {
  ImageGalleryItemLi,
  ImageGalleryItemImage,
} from 'components/ImageGalleryItem/ImageGalleryItem.styled';
import Modal from 'components/Modal/Modal';

export default function ImageGalleryItem({ img }) {
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState({});

  const onModalOpen = image => {
    setModalImage(image);
    setShowModal(!showModal);
  };

  const onModaClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <ImageGalleryItemLi>
        <ImageGalleryItemImage
          src={img.webformatURL}
          alt={img.tags}
          onClick={() => {
            onModalOpen(img);
          }}
        />
      </ImageGalleryItemLi>
      {showModal && (
        <Modal onModalClose={onModaClose}>
          <img src={modalImage.largeImageURL} alt={modalImage.tags} />
        </Modal>
      )}
    </>
  );
}
