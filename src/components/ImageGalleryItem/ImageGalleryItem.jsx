import React from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, ImageItem } from './ImageGalleryItem.styled';

function ImageGalleryItem({ name, url, largeUrl, onClick }) {
  return (
    <GalleryItem onClick={onClick}>
      <ImageItem src={url} alt={name} name={largeUrl} />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  largeUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
