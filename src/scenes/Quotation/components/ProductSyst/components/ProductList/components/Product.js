import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Ratio from 'react-ratio';

const Product = ({ product, addProductToQuotation, toggleSide }) => (
  <TestDiv>
    <button
      type="button"
      onClick={() => {
        addProductToQuotation(product);
        toggleSide({ type: 'add_product' });
      }}
    >
      {console.log(product.acf)}
      <RatioCustom ratio={16 / 9}>
        <img
          src={product.acf.header.cover.url}
          className="photoProduct"
          alt=""
        />
      </RatioCustom>
      <h4 className="nameProduct">
        {product !== undefined && product.title.rendered}
      </h4>
    </button>
  </TestDiv>
);

export default Product;

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  addProductToQuotation: PropTypes.func.isRequired,
  toggleSide: PropTypes.func.isRequired,
};

const TestDiv = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  margin-bottom: 30px;
  button {
    width: 100%;
    border: none;
    padding: 0;
    background-color: #ffffff;
    &:hover {
      cursor: pointer;
    }
  }
  img {
    width: 100%;
    height: 100%;
    max-width: 100%;
    object-fit: cover;
    object-position: 50% 50%;
    transition: transform 1.5s ease-in-out;
  }
  img:hover {
    -moz-transform: scale(1.05);
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
  }
  h4 {
    font-family: OmnesLight;
    font-size: 17px;
    line-height: 23px;
    letter-spacing: 0.7px;
    color: #3c3c3c;
    margin: 0;
    @media only screen and (min-width: 1024px) {
      font-size: 22px;
    }
  }
`;

const RatioCustom = styled(Ratio)`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  margin-bottom: 15px;
  overflow: hidden;
`;
