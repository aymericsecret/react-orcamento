import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Ratio from 'react-ratio';
import ContentLoader from 'react-content-loader';

export default class Product extends Component {
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

  render() {
    const MyLoaderImg = () => (
      <ContentLoader height={300}>
        <rect x="0" y="0" rx="5" ry="5" width="400" height="800" />
      </ContentLoader>
    );
    return (
      <TestDiv>
        <button
          type="button"
          onClick={() => {
            this.props.addProductToQuotation(this.props.product);
            this.props.toggleSide({ type: 'add_product' });
          }}
        >
          {console.log(this.props.product.acf)}
          <RatioCustom ratio={16 / 9}>
            <img
              src={this.props.product.acf.header.cover.sizes.thumbnail}
              className="photoProduct"
              alt={this.props.product.acf.header.cover.alt}
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
          <h4 className="nameProduct">
            {this.props.product !== undefined && this.props.product.title.rendered}
          </h4>
        </button>
      </TestDiv>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.object,
    acf: PropTypes.object,
  }).isRequired,
  addProductToQuotation: PropTypes.func.isRequired,
  toggleSide: PropTypes.func.isRequired,
};

const TestDiv = styled.div`
  position: relative;
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
