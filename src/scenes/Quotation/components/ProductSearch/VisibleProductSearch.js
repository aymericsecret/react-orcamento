import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { initQuoteRequest, saveQuoteRequest } from './actions';
// import { resetQuotation } from '../QuoteSystem/actions';
import ProductSearch from './ProductSearch';


const mapStateToProps = state => ({
  products: state.app.products,
  categories: state.app.categories,
});


// const mapDispatchToProps = dispatch => bindActionCreators({
//   initQuoteRequest,
//   saveQuoteRequest,
//   resetQuotation,
// }, dispatch);

export default connect(mapStateToProps)(ProductSearch);
