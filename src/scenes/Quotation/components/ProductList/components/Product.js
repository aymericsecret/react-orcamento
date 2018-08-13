import React from 'react';
import PropTypes from 'prop-types';

const Product = ({ product }) => (
  <div data-id={product.id}>
    <h4>
      {product.title.rendered}
    </h4>
    <p>
      {product.content.rendered}
    </p>
  </div>
);

export default Product;

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.object.isRequired,
    content: PropTypes.object,
  }).isRequired,
};
