import { connect } from 'react-redux';
import ProductList from './ProductList';
/* eslint linebreak-style: ["error", "windows"] */
const mapStateToProps = state => ({
  products: state.app.products,
  subCategory: state.categoryList.subCategory,
  showSubCategory: state.categoryList.showSubCategory,
  appCategoriesLoaded: state.app.appProductsLoaded,
  categories: state.app.categories,
  mainCategory: state.categoryList.mainCategory,
  sessionPermission: state.session.permission,
});


export default connect(mapStateToProps)(ProductList);
