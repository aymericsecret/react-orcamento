import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import QuoteElem from './QuoteElem';
import {
  removeProductFromQuotation,
  updateProductQuantity,
  updateProductPrice,
  updateProductTotalPrice,
  updateProductNote,
  updateProductSize,
  updateProductMaterial,
  updateProductSizeX,
  updateProductSizeY,
} from '../../actions';

const mapStateToProps = state => ({
  products: state.app.products,
  userPermission: state.session.permission,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  removeItem: removeProductFromQuotation,
  updateQuantity: updateProductQuantity,
  updatePrice: updateProductPrice,
  updateTotalPrice: updateProductTotalPrice,
  updateNote: updateProductNote,
  updateSize: updateProductSize,
  updateMaterial: updateProductMaterial,
  updateSizeX: updateProductSizeX,
  updateSizeY: updateProductSizeY,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(QuoteElem);
