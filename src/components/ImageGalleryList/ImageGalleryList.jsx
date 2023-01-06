import PropTypes from 'prop-types';

import { ImageGalleryContainer } from 'components/ImageGallery/ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGalleryList({ images, onModalOpen }) {
  //   console.log(images);
  //   console.log(typeof images);
  return (
    <ImageGalleryContainer>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          img={image}
          onModalOpen={onModalOpen}
        />
      ))}
    </ImageGalleryContainer>
  );
}

ImageGalleryList.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ).isRequired,
  onModalOpen: PropTypes.func.isRequired,
};
