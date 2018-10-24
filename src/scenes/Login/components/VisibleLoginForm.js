import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initSession, stopSession } from './actions';
import LoginForm from './LoginForm';


const mapStateToProps = state => ({
  session: state.session,
});


const mapDispatchToProps = dispatch => bindActionCreators({
  initSession,
  stopSession,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
