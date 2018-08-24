import { connect } from 'react-redux';
import ProductList from './ProductList';

const mapStateToProps = state => ({
  products: state.app.products,
  subCategory: state.categoryList.subCategory,
  showSubCategory: state.categoryList.showSubCategory,
});


export default connect(mapStateToProps)(ProductList);
