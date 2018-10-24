import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getOptions } from './actions';
import PDF from './pdf';

const mapStateToProps = state => ({
  allProducts: state.app.products,
  products: state.quotation.quotation.products,
  notas: state.pdf.options.notas,
  infoContact: state.pdf.options,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getOptions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PDF);
