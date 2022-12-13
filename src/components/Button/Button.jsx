import React from 'react';
import PropTypes from 'prop-types';
import { LoadMoreBtn } from './Button.styled';
import { AiFillPlusCircle } from 'react-icons/ai';

function Button({ onClick }) {
  return (
    <LoadMoreBtn onClick={onClick}>
      <span>Load More</span>
      <AiFillPlusCircle size={30} />
    </LoadMoreBtn>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
