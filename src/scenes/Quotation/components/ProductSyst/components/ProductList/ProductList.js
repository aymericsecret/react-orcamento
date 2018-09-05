import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentLoader from 'react-content-loader';
import VisibleProduct from './components/VisibleProduct';

const ProductList = (props) => {
  const {
    products, showSubCategory, subCategory, toggleSide, categories, mainCategory,
  } = props;

  const MyLoaderImg = () => (
    <ContentLoader height={170} width={210}>
      <rect x="20" y="127" rx="4" ry="4" width="158" height="20.54" />
      <rect x="-0.73" y="-4" rx="5" ry="5" width="208" height="120" />
    </ContentLoader>
  );

  if (products.length === 0
    && showSubCategory
    && categories.children[mainCategory].children[subCategory] !== undefined) {
    return (
      <ProductsBlock>{
        [...Array(categories.children[mainCategory].children[subCategory].count)].map(() => <div className="flex50">{MyLoaderImg()}</div>)
        }
      </ProductsBlock>
    );
  }

  const productToShow = products.filter(
    product => product.categories.find(
      category => category === subCategory) !== undefined);

  console.log(products);

  return (
    <div>

      <ProductsBlock>
        {showSubCategory
            && productToShow.map(product => (
              (!(props.sessionPermission === 0 && product.acf.permission === true) && (
              <div className="flex50" key={product.id}>
                <VisibleProduct product={product} key={product.id} toggleSide={toggleSide} />
              </div>
              ))
            ))
          }
      </ProductsBlock>
    </div>
  );
};

export default ProductList;

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  subCategory: PropTypes.number.isRequired,
  showSubCategory: PropTypes.bool.isRequired,
  toggleSide: PropTypes.func.isRequired,
  categories: PropTypes.shape({
    children: PropTypes.array.isRequired,
  }).isRequired,
  mainCategory: PropTypes.number.isRequired,
  sessionPermission: PropTypes.number.isRequired,
};

const ProductsBlock = styled.div`
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .flex50 {
    width: calc(50% - 10px);
  }
`;
