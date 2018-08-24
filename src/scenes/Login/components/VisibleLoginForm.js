import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initSession } from './actions';
import LoginForm from './LoginForm';


const mapStateToProps = state => ({
  session: state.session,
});


const mapDispatchToProps = dispatch => bindActionCreators({
  initSession,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
