import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Ratio from 'react-ratio';
import windowDimensions from 'react-window-dimensions';
import ContentLoader from 'react-content-loader';
import config from '../../../../../../../utils/config';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { imageStatus: 'loading' };
  }

  handleImageLoaded = () => {
    this.setState({ imageStatus: 'loaded' });
  }

  handleImageErrored = () => {
    this.setState({ imageStatus: 'failed to load' });
  }

  hideSearchInputInMobile = () => {
    // Only in mobile
    if (this.props.width <= 576) {
      // Get ProductBlock component of ProductSearch
      const searchIcon = document.getElementById('id_logo_search');
      // If the inputSearch is active hide at click on a product
      if (searchIcon.classList.contains('active')) {
        searchIcon.classList.remove('active');
      }
    }
  }

  render() {
    const coverImg = (this.props.product.acf.packshot === undefined || this.props.product.acf.packshot === false)
      ? this.props.product.acf.header.cover.sizes.thumbnail
      : this.props.product.acf.packshot.sizes.thumbnail;
    const coverAlt = (this.props.product.acf.packshot === undefined || this.props.product.acf.packshot === false)
      ? this.props.product.acf.header.cover.alt
      : this.props.product.acf.packshot.alt;

    const MyLoaderImg = () => (
      <ContentLoader height={300}>
        <rect x="0" y="0" rx="5" ry="5" width="400" height="800" />
      </ContentLoader>
    );
    return (
      <ProductBlock>
        <button
          type="button"
          onClick={() => {
            this.props.addProductToQuotation(this.props.product);
            this.props.toggleSide({ type: 'add_product' });
            this.hideSearchInputInMobile();
          }}
        >
          <RatioCustom ratio={16 / 9}>
            <img
              src={coverImg}
              className="photoProduct"
              alt={coverAlt}
              onLoad={this.handleImageLoaded}
              onError={this.handleImageErrored}
            />
            {this.state.imageStatus === 'loaded' && (
              <DivFondAdd>
                <div className="add">+</div>
                <div className="fond" />
              </DivFondAdd>
            )}
            <Loader>
              {this.state.imageStatus === 'loading' && (
                MyLoaderImg()
              )}
            </Loader>
          </RatioCustom>
          {/* eslint-disable-next-line react/no-danger */}
          <h4 className="nameProduct" dangerouslySetInnerHTML={{ __html: this.props.product !== undefined && this.props.product.title.rendered }} />
        </button>
      </ProductBlock>
    );
  }
}


export default windowDimensions()(Product);

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.object,
    acf: PropTypes.object,
  }).isRequired,
  addProductToQuotation: PropTypes.func.isRequired,
  toggleSide: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};

const ProductBlock = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  button {
    width: 100%;
    height: auto;
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
    font-family: ${config.fonts.light};
    font-size: 17px;
    line-height: 23px;

    opacity: .95;
    letter-spacing: 0.8px;
    margin: 0;
    @media only screen and (min-width: 1024px) {
      font-size: 22px;
    }
  }
`;

const RatioCustom = styled(Ratio)`
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  margin-bottom: 15px;
  overflow: hidden;
`;

const DivFondAdd = styled.div`
  position: absolute;
  z-index: 400;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .fond {
    width: 100%;
    height: 100%;
    background-color: #ededed;
    opacity: 0;
    transition: opacity 0.7s ease-out;
  }
  .add {
    position: absolute;
    z-index: 500;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    opacity: 0;
    font-size: 100px;
    transition: opacity 0.7s ease-out;
    backface-visibility: hidden;
  }
  &:hover {
    .fond {
      opacity: 0.7;
    }
    .add {
      opacity: 1;
    }
  }
`;

const Loader = styled.div`
  position: absolute;
  z-index: 300;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
