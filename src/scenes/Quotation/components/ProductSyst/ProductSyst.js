import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
// import Category from './components/CategoryList/components/Category';
// import LinkCustom from '../../../../components/LinkCustom';
// import VisibleProduct from './components/ProductList/components/VisibleProduct';
// import CategoryList from './components/CategoryList/CategoryList';
import VisibleCategoryList from './components/CategoryList/VisibleCategoryList';
import VisibleProductList from './components/ProductList/VisibleProductList';
// import VisibleProductsList from './components/ProductList/VisibleProductList';

class ProductSyst extends Component {
  constructor(props) {
    super(props);
    this.handlerProductSyst = this.handlerProductSyst.bind(this);
  }

  state = {
    idUnderCategory: '5',
  }

  handlerProductSyst(id) {
    this.setState({
      idUnderCategory: id.toString(),
    }, function test() {
      console.log(`idUnderCategory (state) : ${this.state.idUnderCategory} / id : ${id}`);
    });
  }

  render() {
    // if (this.state.idUnderCategory === '5') {
    //   return (
    //     <ProductSysteme>
    //       <CategoryList handlerProductSyst={this.handlerProductSyst} />
    //       {/* <VisibleProductList idUnderCategory={this.state.idUnderCategory} /> */}
    //     </ProductSysteme>
    //   );
    // }
    return (
      <ProductSysteme>
        <VisibleCategoryList />
        {/* <CategoryList handlerProductSyst={this.handlerProductSyst} /> */}
        <VisibleProductList idUnderCategory={this.state.idUnderCategory} />
      </ProductSysteme>
    );
  }
}

export default ProductSyst;

const ProductSysteme = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50%;
  overflow: scroll;
  padding: 40px 30px;
`;
