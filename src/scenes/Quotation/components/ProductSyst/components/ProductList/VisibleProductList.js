import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProducts } from './actions';
import ProductList from './ProductList';
// import ProductSyst from '../../ProductSyst';

const mapStateToProps = state => ({
  products: state.products.products,
  isLoaded: state.products.productsLoaded,
  productsLoadedAt: state.products.productsLoadedAt.toString(),
  subCategory: state.categoryList.subCategory,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getProducts,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
