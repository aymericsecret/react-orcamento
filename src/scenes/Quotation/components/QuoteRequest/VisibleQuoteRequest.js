import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initQuoteRequest, saveQuoteRequest, setQuoteRequestDefaultMessage } from './actions';
import { resetQuotation } from '../QuoteSystem/actions';
import QuotationRequest from './QuoteRequest';


const mapStateToProps = state => ({
  isAdmin: state.session.permission,
  quoteRequest: state.quoteRequest.request,
  isCreated: state.quoteRequest.isCreated,
  orcaOptions: state.pdf.options,
  quotation: state.quotation.quotation,
  products: state.app.products,
});


const mapDispatchToProps = dispatch => bindActionCreators({
  initQuoteRequest,
  saveQuoteRequest,
  resetQuotation,
  setQuoteRequestDefaultMessage,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(QuotationRequest);
