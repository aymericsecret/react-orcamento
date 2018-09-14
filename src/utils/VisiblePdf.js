import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNotes } from './actions';
import PDF from './pdf';

const mapStateToProps = state => ({
  allProducts: state.app.products,
  products: state.quotation.quotation.products,
  notas: state.pdf.tabNotas,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getNotes,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PDF);
