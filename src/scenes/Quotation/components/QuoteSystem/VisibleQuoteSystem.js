import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initQuotation } from './actions';
import QuoteSystem from './QuoteSystem';


const mapStateToProps = state => ({
  quotation: state.quotation.quotation,
});


const mapDispatchToProps = dispatch => bindActionCreators({
  initQuotation,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(QuoteSystem);
