import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initApp } from './actions';
import Quotation from './Quotation';


const mapStateToProps = state => ({
  appLoadedAt: state.app.appLoadedAt,
  appLoaded: state.app.appLoaded,
  categories: state.app.categories,
});


const mapDispatchToProps = dispatch => bindActionCreators({
  initApp,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Quotation);
