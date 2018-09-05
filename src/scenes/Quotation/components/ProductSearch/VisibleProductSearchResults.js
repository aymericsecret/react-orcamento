import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  searchToggle,
} from './actions';
import ProductSearchResults from './ProductSearchResults';


const mapStateToProps = state => ({
  search: state.search,
});


const mapDispatchToProps = dispatch => bindActionCreators({
  searchToggle,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductSearchResults);
