// import { Component } from 'react';

import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { animateScroll as scroll } from 'react-scroll';

import ImageGalleryList from 'components/ImageGalleryList/ImageGalleryList';
import Loader from 'components/Loader/Loader';
import FetchImages from 'services/GalleryApi';
import Button from 'components/Button/Button';

import * as Notify from 'services/Notify';

const imagesPerPage = 12;

export default function ImageGallery({ searchQuery, page, loadMore }) {
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [prevSearchQuery, setPrevSearchQuery] = useState('');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    async function fetchData() {
      let loadedImages = 0;
      try {
        const response = await FetchImages(searchQuery, page, imagesPerPage);

        setIsLoading(true);
        setPrevSearchQuery(searchQuery);

        if (searchQuery !== prevSearchQuery) {
          setImages(response.data.hits);
          setIsLoading(false);
          setTotalImages(response.data.total);
          loadedImages = response.data.hits.length;
        } else {
          const newImages = [...images, ...response.data.hits];
          setImages(newImages);
          loadedImages = newImages.length;
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
        setIsLoading(false);
      }

      if (loadedImages > imagesPerPage) {
        scroll.scrollToBottom();
      } else {
        scroll.scrollToTop();
      }
    }
    fetchData();
  }, [page, searchQuery]);

  return (
    <>
      <ImageGalleryList images={images} />
      {isLoading && <Loader />}
      {images.length > 0 && images.length < totalImages && (
        <Button onClick={loadMore} />
      )}
    </>
  );
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string,
  page: PropTypes.number,
  imagesPerPage: PropTypes.number,
  loadMore: PropTypes.func,
};
