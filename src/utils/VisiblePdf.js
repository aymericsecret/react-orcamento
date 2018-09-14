import { connect } from 'react-redux';
import PDF from './pdf';

const mapStateToProps = state => ({
  products: state.quotation.quotation.products,
  allProducts: state.app.products,
});

export default connect(mapStateToProps)(PDF);
