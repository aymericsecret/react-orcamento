import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addProductToQuotation } from '../../QuoteSystem/actions';
import Product from './Product';

const mapStateToProps = state => ({
  quotation: state.quotation.quotation,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addProductToQuotation,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Product);
