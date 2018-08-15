import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Category from './components/Category';
import LinkCustom from '../../../../components/LinkCustom';
import VisibleProduct from './components/VisibleProduct';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.var = 0;
  }

  state = {
    categories: [],
    underCategories: [],
  }

  componentDidMount = () => {
    const { getProducts, isLoaded, productsLoadedAt } = this.props;
    const oneHour = 60 * 60 * 1000;
    console.log(new Date() - new Date(productsLoadedAt));

    try {
      // Get the ID of the main categories
      fetch('http://cremme.com.br/wp-json/wp/v2/categories?parent=0&exclude=48,33,14,11,12')
        .then(res => res.json())
        .then((result) => {
          this.setState({ categories: result });
          console.log(this.state.categories);
          this.state.categories.map(categorie => (console.log(categorie.id)));
        },
        function test() {
          console.log('avant this.var update : ');
          this.var = this.state.categories[0].id;
        });

      // Get the object of the under categories
      console.log('avant this.state.witchCategorie : ');
      console.log(this.state.categories[0]);
      fetch(`http://cremme.com.br/wp-json/wp/v2/categories?parent=${this.var}`)
        .then(res => res.json())
        .then((result) => {
          this.setState({ underCategories: result });
          console.log(this.state.underCategories);
          this.state.underCategories.map(categorie => (console.log(categorie.name)));
        });
    } catch (e) {
      console.log(e);
    }

    // }
    if (!isLoaded || ((new Date() - new Date(productsLoadedAt)) > oneHour)) getProducts();
  }

  ChangewitchCategorie = (id) => {
    console.log('avant (ChangewitchCategorie) this.state.witchCategorie : ');
    fetch(`http://cremme.com.br/wp-json/wp/v2/categories?parent=${id}`)
      .then(res => res.json())
      .then((result) => {
        this.setState({ underCategories: result });
        console.log(this.state.underCategories);
        // this.state.underCategories.map(categorie => (console.log(categorie.name)));
      });
    // console.log('salut');
    // this.setState({
    //   test:
    // });
  }

  render() {
    const { products, isLoaded } = this.props;
    if (!isLoaded) return <h1>Not loaded</h1>;
    return (
      <ProductsBlock>
        <Categories>
          {this.state.categories.map(categorie => (
            <LinkCustom
              eventClick={() => this.ChangewitchCategorie(categorie.id)}
              key={categorie.id}
            > {categorie.name}
            </LinkCustom>
          ))}
        </Categories>
        {this.state.underCategories.map(sousCategorie => (
          <Category
            name={sousCategorie.name}
            key={sousCategorie.id}
            id={sousCategorie.id}
          />
        ))
        }
        {products.map(product => (<VisibleProduct product={product} key={product.id} />))}
      </ProductsBlock>
    );
  }
}

export default ProductList;

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  isLoaded: PropTypes.bool.isRequired,
  getProducts: PropTypes.func.isRequired,
  productsLoadedAt: PropTypes.string.isRequired,
};

// defaut
ProductList.defaultProps = {
  products: [],
};

const ProductsBlock = styled.div`
  width: 50%;
  height: 100%;
  padding: 0 20px;
`;
const Categories = styled.div`
  height: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  display: flex;
  justify-content: space-around;
`;
