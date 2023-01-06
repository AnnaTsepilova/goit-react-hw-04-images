import PropTypes from 'prop-types';
import {
  ImageGalleryItemLi,
  ImageGalleryItemImage,
} from 'components/ImageGalleryItem/ImageGalleryItem.styled';

export default function ImageGalleryItem({ img, onModalOpen }) {
  // console.log(image);
  // console.log(typeof image);
  return (
    <ImageGalleryItemLi>
      <ImageGalleryItemImage
        src={img.webformatURL}
        alt={img.tags}
        onClick={() => {
          onModalOpen(img);
        }}
      />
    </ImageGalleryItemLi>
  );
}

ImageGalleryItem.propTypes = {
  onModalOpen: PropTypes.func.isRequired,
  img: PropTypes.objectOf(
    PropTypes.shape({
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
      id: PropTypes.number,
    })
  ).isRequired,
};
