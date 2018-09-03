import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentLoader from 'react-content-loader';
import VisibleProduct from './components/VisibleProduct';

const ProductList = (props) => {
  const {
    products, showSubCategory, subCategory, toggleSide, categories, mainCategory,
  } = props;
  // console.log(subCategory);

  const MyLoaderImg = () => (
    <ContentLoader height={170} width={210}>
      <rect x="20" y="127" rx="4" ry="4" width="158" height="20.54" />
      <rect x="-0.73" y="-4" rx="5" ry="5" width="208" height="120" />
    </ContentLoader>
  );

  if (products.length === 0
    && showSubCategory
    && categories.children[mainCategory].children[subCategory] !== undefined) {
    // console.log(categories.children[mainCategory].children[subCategory]);
    return (
      <ProductsBlock>{
        [...Array(categories.children[mainCategory].children[subCategory].count)].map(i => <div className="flex50">{MyLoaderImg()}</div>)
        }
      </ProductsBlock>
    );
  }

  // console.log(`products : ${products}`);
  const productToShow = products.filter(
    product => product.categories.find(
      category => category === subCategory) !== undefined);
  // console.log(`productToShow : ${productToShow}`);

  return (
    <div>
      {/* <ProductsBlock>{
        [...Array(3)].map(i => <div className="flex50">{MyLoaderImg()}</div>)}
      </ProductsBlock> */}
      <ProductsBlock>
        {showSubCategory
            && productToShow.map(product => (
              <div className="flex50" key={product.id}>
                <VisibleProduct product={product} key={product.id} toggleSide={toggleSide} />
              </div>
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
