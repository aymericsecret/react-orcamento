import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Product from './components/Product';

class ProductList extends Component {
  componentDidMount = () => {
    if (this.props.products.length <= 0) {
      try {
        // Products : http://cremme.com.br/wp-json/wp/v2/posts
        // const resCats = await fetch('http://cremme.com.br/wp-json/wp/v2/categories');
        // const categories = await resCats.json();

        fetch('http://cremme.com.br/wp-json/wp/v2/categories')
          .then(result => console.log(result));
        fetch('http://cremme.com.br/wp-json/wp/v2/posts?categories=2')
        // fetch('http://localhost/cremme/wp-json/wp/v2/categories')
          .then(res => res.json())
          .then((result) => {
            const products = result;
            console.log(products);
            this.props.update(products);
          }, (error) => {
            console.log(error);
          });

        // const products = await res.json();
        // console.log(products);
        // this.props.update(products);
        // this.setState({
        //   products,
        // });
      } catch (e) {
        console.log(e);
      }
    }
    // }
  }

  render() {
    return (
      <ProductsBlock>
        {this.props.products.map(product => (<Product product={product} key={product.id} />))}
      </ProductsBlock>
    );
  }
}

export default ProductList;

ProductList.propTypes = {
  update: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};
const ProductsBlock = styled.div`
  width: 50%;
  height: 100%;
`;
