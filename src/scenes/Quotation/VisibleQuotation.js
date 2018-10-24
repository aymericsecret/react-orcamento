import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initApp } from './actions';
import Quotation from './Quotation';


const mapStateToProps = state => ({
  app: state.app,
  session: state.session,
});


const mapDispatchToProps = dispatch => bindActionCreators({
  initApp,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Quotation);
