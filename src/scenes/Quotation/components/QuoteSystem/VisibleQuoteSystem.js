import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initQuotation, updateProductsOrder, resetQuotation } from './actions';
import QuoteSystem from './QuoteSystem';


const mapStateToProps = state => ({
  quotation: state.quotation.quotation,
});


const mapDispatchToProps = dispatch => bindActionCreators({
  initQuotation,
  updateProductsOrder,
  resetQuotation,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(QuoteSystem);
