import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initQuoteRequest, saveQuoteRequest } from './actions';
import { resetQuotation } from '../QuoteSystem/actions';
import QuotationRequest from './QuoteRequest';


const mapStateToProps = state => ({
  isAdmin: state.session.permission,
  quoteRequest: state.quoteRequest.request,
  isCreated: state.quoteRequest.isCreated,
});


const mapDispatchToProps = dispatch => bindActionCreators({
  initQuoteRequest,
  saveQuoteRequest,
  resetQuotation,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(QuotationRequest);
