import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setMainCategory,
  setSubCategory,
} from './actions';
import CategoryList from './CategoryList';

const mapStateToProps = state => ({
  sessionPermission: state.session.permission,
  categoryList: state.app.categories,
  mainCategory: state.categoryList.mainCategory,
  subCategory: state.categoryList.subCategory,
  showSubCategory: state.categoryList.showSubCategory,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setMainCategory,
  setSubCategory,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
