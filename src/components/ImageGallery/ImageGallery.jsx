import { Component } from 'react';
import PropTypes from 'prop-types';
import { animateScroll as scroll } from 'react-scroll';

import ImageGalleryList from 'components/ImageGalleryList/ImageGalleryList';
import Loader from 'components/Loader/Loader';
import FetchImages from 'services/GalleryApi';
import Button from 'components/Button/Button';

import * as Notify from 'services/Notify';

const imagesPerPage = 12;

// export default function ImageGallery(
//   searchQuery,
//   page,
//   imagesPerPage,
//   loadMore
// ) {
//   const [images, setImages] = useState([]);
//   const [totalImages, setTotalImages] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   // const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [modalImage, setModalImage] = useState({});

//   useEffect(() => {
//     async function foo(prevProps, prevState) {
//       try {
//         const response = await FetchImages(searchQuery, page, imagesPerPage);

//         setIsLoading(true);

//         if (searchQuery !== prevProps.searchQuery) {
//           setImages(response.data.hits);
//           setIsLoading(false);
//           setTotalImages(response.data.total);
//         } else {
//           setImages(prevState => [...prevState.images, ...response.data.hits]);
//         }

//         if (
//           response.data.hits.length > 0 &&
//           response.data.hits.length < imagesPerPage
//         ) {
//           Notify.NotificationInfo(Notify.INFO_MESSAGE);
//         }

//         if (!response.data.hits.length) {
//           Notify.NotificationError(Notify.NO_FOUND_MESSAGE);
//         }
//       } catch (error) {
//         Notify.NotificationError(`${Notify.ERROR_MESSAGE} ${error.message}`);
//       } finally {
//         setIsLoading(false);
//       }

//       if (images.length > imagesPerPage) {
//         scroll.scrollToBottom();
//       } else {
//         scroll.scrollToTop();
//       }
//     }
//     foo();
//   }, [searchQuery, page, images.length, imagesPerPage]);

//   const onModalOpen = image => {
//     setModalImage(image);
//     setShowModal(!showModal);
//   };

//   const onModaClose = () => {
//     setShowModal(false);
//   };

//   return (
//     <>
//       <ImageGalleryList images={images} onModalOpen={onModalOpen} />
//       {isLoading && <Loader />}
//       {images.length > 0 && images.length < totalImages && (
//         <Button onClick={loadMore} />
//       )}
//       {showModal && (
//         <Modal onModalClose={onModaClose}>
//           <img src={modalImage.largeImageURL} alt={modalImage.tags} />
//         </Modal>
//       )}
//     </>
//   );
// }

export default class ImageGallery extends Component {
  static propTypes = {
    images: PropTypes.array,
    totalImages: PropTypes.number,
    isLoading: PropTypes.bool,
    error: PropTypes.bool,
    showModal: PropTypes.bool,
    modalImage: PropTypes.object,
  };

  state = {
    images: [],
    totalImages: 0,
    isLoading: false,
    error: null,
    showModal: false,
    modalImage: {},
  };

  async componentDidUpdate(prevProps, prevState) {
    let searchQuery = this.props.searchQuery;
    let page = this.props.page;

    if (searchQuery !== prevProps.searchQuery || page !== prevProps.page) {
      try {
        this.setState({ isLoading: true });

        const response = await FetchImages(searchQuery, page, imagesPerPage);

        if (searchQuery !== prevProps.searchQuery) {
          this.setState({
            images: response.data.hits,
            isLoading: false,
            totalImages: response.data.total,
          });
        } else {
          this.setState({
            images: [...prevState.images, ...response.data.hits],
            isLoading: false,
            totalImages: response.data.total,
          });
        }

        if (
          response.data.hits.length > 0 &&
          response.data.hits.length < imagesPerPage
        ) {
          Notify.NotificationInfo(Notify.INFO_MESSAGE);
        }

        if (!response.data.hits.length) {
          Notify.NotificationError(Notify.NO_FOUND_MESSAGE);
        }
      } catch (error) {
        Notify.NotificationError(`${Notify.ERROR_MESSAGE} ${error.message}`);
      } finally {
        this.setState({ isLoading: false });
      }
    }

    if (this.state.images.length > imagesPerPage) {
      scroll.scrollToBottom();
    } else {
      scroll.scrollToTop();
    }
  }

  render() {
    const { images, totalImages, isLoading } = this.state;

    return (
      <>
        <ImageGalleryList images={images} />
        {isLoading && <Loader />}
        {images.length > 0 && images.length < totalImages && (
          <Button onClick={this.props.loadMore} />
        )}
      </>
    );
  }
}
