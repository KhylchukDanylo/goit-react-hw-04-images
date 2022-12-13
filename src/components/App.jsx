import React, { Component } from 'react';
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

export default class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    isLoading: false,
    largeImgLink: null,
    imgAlt: null,
    imgOnRequest: 0,
    totalImages: 0,
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.setState({ isLoading: true });
      try {
        const response = await API.fetchImagesWithQuery(searchQuery, page);
        const { hits, total } = response.data;
        if (hits.length === 0) {
          toast.error('Nothing found for your requestо', {
            icon: '👻',
          });
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
        this.setState({
          searchQuery,
          images: imagesData,
          totalImages: total,
          imgOnRequest: hits.length,
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }

    if (prevState.page !== page && page !== 1) {
      this.setState({ isLoading: true });
      try {
        const response = await API.fetchImagesWithQuery(searchQuery, page);
        const { hits } = response.data;
        const imagesData = hits.map(image => {
          return {
            id: image.id,
            webformatURL: image.webformatURL,
            largeImageURL: image.largeImageURL,
            tags: image.tags,
          };
        });
        this.setState(({ images, imgOnRequest }) => ({
          images: [...images, ...imagesData],
          imgOnRequest: imgOnRequest + imagesData.length,
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  getSearchName = searchQuery => {
    this.setState({ searchQuery, page: 1, imgOnRequest: 0, images: [] });
  };

  onImageClick = event => {
    const { name, alt } = event.target;
    this.setState({
      largeImgLink: name,
      imgAlt: alt,
    });
  };

  onCloseModal = () => {
    this.setState({ largeImgLink: null, imgAlt: null });
  };

  onLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const {
      images,
      imgAlt,
      largeImgLink,
      isLoading,
      imgOnRequest,
      totalImages,
    } = this.state;
    return (
      <SearchApp>
        <Searchbar onSubmit={this.getSearchName} />
        {images.length > 0 && (
          <ImageGallery items={images} onImgClick={this.onImageClick} />
        )}
        {largeImgLink && (
          <Modal
            alt={imgAlt}
            url={largeImgLink}
            closeModal={this.onCloseModal}
          />
        )}
        {imgOnRequest >= 12 && imgOnRequest < totalImages && !isLoading && (
          <Button onClick={this.onLoadMoreClick} />
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
}
