import React from 'react';
import PropTypes from 'prop-types';

const Product = ({ product, addProductToQuotation }) => (
  <button type="button" onClick={() => addProductToQuotation(product)}>
    <h4>
      {product !== undefined && product.title.rendered}
    </h4>
  </button>
);

export default Product;

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  addProductToQuotation: PropTypes.func.isRequired,
};
