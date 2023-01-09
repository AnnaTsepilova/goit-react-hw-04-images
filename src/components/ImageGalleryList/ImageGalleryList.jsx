import PropTypes from 'prop-types';

import { ImageGalleryContainer } from 'components/ImageGallery/ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGalleryList({ images }) {
  return (
    <ImageGalleryContainer>
      {images.map(image => (
        <ImageGalleryItem key={image.id} img={image} />
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
};
