import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCategoryList, setMainCategory, setSubCategory } from './actions';
import CategoryList from './CategoryList';

const mapStateToProps = state => ({
  categoryList: state.categoryList.categoryList,
  categoryIsLoaded: state.categoryList.categoryIsLoaded,
  categoryLoadedAt: state.categoryList.categoryLoadedAt.toString(),
  mainCategory: state.categoryList.mainCategory,
  subCategory: state.categoryList.subCategory,
  isLoaded: state.products.productsLoaded,
  showSubCategory: state.categoryList.showSubCategory,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getCategoryList,
  setMainCategory,
  setSubCategory,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
