import { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { animateScroll as scroll } from 'react-scroll';
import PropTypes from 'prop-types';

import ImageGalleryList from 'components/ImageGalleryList/ImageGalleryList';
import Loader from 'components/Loader/Loader';
import FetchImages from 'services/GalleryApi';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

const imagesPerPage = 12;

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

  componentDidMount() {
    const { searchQuery, page } = this.props;
    if (searchQuery) {
      FetchImages(searchQuery, page);
    }
  }

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
          NotificationManager.info(
            "We're sorry, but you've reached the end of search results."
          );
        }

        if (!response.data.hits.length) {
          NotificationManager.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
      } catch (error) {
        NotificationManager.error(`API error: ${error.message}`);
        this.setState({ isLoading: false });
      }
    }
    if (this.state.images.length > imagesPerPage) {
      scroll.scrollToBottom();
    } else {
      scroll.scrollToTop();
    }
  }

  onModalOpen = image => {
    this.setState(({ showModal }) => ({
      modalImage: image,
      showModal: !showModal,
    }));
  };

  onModaClose = () => {
    this.setState(() => ({
      showModal: false,
    }));
  };

  render() {
    const { images, totalImages, isLoading, showModal, modalImage } =
      this.state;

    return (
      <>
        <ImageGalleryList images={images} onModalOpen={this.onModalOpen} />
        {isLoading && <Loader />}
        {images.length > 0 && images.length < totalImages && (
          <Button onClick={this.props.loadMore} />
        )}
        {showModal && (
          <Modal onModalClose={this.onModaClose}>
            <img src={modalImage.largeImageURL} alt={modalImage.tags} />
          </Modal>
        )}
      </>
    );
  }
}
