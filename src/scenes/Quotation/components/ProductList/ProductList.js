import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import Product from './components/Product';
import Category from './components/Category';
import LinkCustom from "../../../../components/LinkCustom";

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
    if (this.props.products.length <= 0) {
      try {
        // Products : http://cremme.com.br/wp-json/wp/v2/posts
        // const resCats = await fetch('http://cremme.com.br/wp-json/wp/v2/categories');
        // const categories = await resCats.json();

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
        fetch('http://cremme.com.br/wp-json/wp/v2/categories?parent=' + this.var)
          .then(res => res.json())
          .then((result) => {
            this.setState({ underCategories: result });
            console.log(this.state.underCategories);
            this.state.underCategories.map(categorie => (console.log(categorie.name)));
          });

        // Get the product
        fetch('http://cremme.com.br/wp-json/wp/v2/posts?categories=2')
        // fetch('http://localhost/cremme/wp-json/wp/v2/categories')
          .then(res => res.json())
          .then((result) => {
            const products = result;
            // console.log(products);
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

  ChangewitchCategorie = (id) => {
    console.log('avant (ChangewitchCategorie) this.state.witchCategorie : ');
    fetch('http://cremme.com.br/wp-json/wp/v2/categories?parent=' + id)
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
    return (
      <ProductsBlock>
        <Categories>
          {this.state.categories.map(categorie => (
            // <Categorie key={categorie.id}><button type="submit" value={categorie.id} onClick={() => this.ChangewitchCategorie(categorie.id)}> <h3>{categorie.name}</h3> </button></Categorie>
            <LinkCustom eventClick={() => this.ChangewitchCategorie(categorie.id)}> {categorie.name} </LinkCustom>
          ))}
        </Categories>
        {/* {this.state.underCategories.map(categorie => (<h2>{categorie.name}</h2>))} */}
        {/* {<Product name={this.Souscategories.name} />} */}
        {console.log(this.state.underCategories)}
        {/* {this.Souscategories.map(categorie => (console.log(categorie.name)))} */}
        {this.state.underCategories.map(sousCategorie => (
          <Category
            name={sousCategorie.name}
            key={sousCategorie.id}
            id={sousCategorie.id}
          />
        ))
        }
        {/* {this.props.products.map(product => (
          <Product
            product={product}
            key={product.id}
          />
        ))
        } */}
        {/* {this.props.products.map(product =>
        (<Product product={product} key={product.id} />))} */}
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
const Categories = styled.div`
  height: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  display: flex;
  justify-content: space-around;
`;
