import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import GlobalStyles from './GlobalStyles';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Button from './Button';
import Notification from './Notification';
import 'react-toastify/dist/ReactToastify.css';
import * as API from './services/api';
import { SearchApp } from './App.styled';
import { ThreeDots } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [imgOnRequest, setImgOnRequest] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImgLink, setLargeImgLink] = useState(null);
  const [imgAlt, setImgAlt] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    setIsLoading(true);
    async function showImages() {
      try {
        const response = await API.fetchImagesWithQuery(searchQuery, page);
        const { hits, total } = response.data;
        if (hits.length === 0) {
          toast.error('Nothing found for your requestо', {
            icon: '👻',
          });
          setTotalImages(0);
          return;
        }
        const imagesData = hits.map(image => {
          return {
            id: image.id,
            webformatURL: image.webformatURL,
            largeImageURL: image.largeImageURL,
            tags: image.tags,
          };
        });
        if (page === 1) {
          setSearchQuery(searchQuery);
          setImages(imagesData);
          setTotalImages(total);
          setImgOnRequest(hits.length);
        } else {
          setImages(prevImages => [...prevImages, ...imagesData]);
          setImgOnRequest(
            prevImgOnRequest => prevImgOnRequest + imagesData.length
          );
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    showImages();
  }, [page, searchQuery]);

  const getSearchName = query => {
    setSearchQuery(query);
    setPage(1);
    setImgOnRequest(0);
    setImages([]);
  };

  const onImageClick = event => {
    const { name, alt } = event.target;
    setLargeImgLink(name);
    setImgAlt(alt);
  };

  const onCloseModal = () => {
    setLargeImgLink(null);
    setImgAlt(null);
  };

  const onLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <SearchApp>
      {error && <h2>Data processing error. Try reloading the page.</h2>}
      <Searchbar onSubmit={getSearchName} />
      {images.length > 0 && (
        <ImageGallery items={images} onImgClick={onImageClick} />
      )}
      {largeImgLink && (
        <Modal alt={imgAlt} url={largeImgLink} closeModal={onCloseModal} />
      )}
      {imgOnRequest >= 12 && imgOnRequest < totalImages && !isLoading && (
        <Button onClick={onLoadMoreClick} />
      )}
      {isLoading && <ThreeDots color="#3f51b5" />}
      {imgOnRequest > 1 && imgOnRequest === totalImages && (
        <Notification>Photos are finished saving...</Notification>
      )}
      <ToastContainer autoClose={2000} />
      <GlobalStyles />
    </SearchApp>
  );
}
