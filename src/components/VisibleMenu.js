import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  searchToggle,
} from '../scenes/Quotation/components/ProductSearch/actions';
import Menu from './Menu';

const mapStateToProps = state => ({
  search: state.search,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  searchToggle,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
