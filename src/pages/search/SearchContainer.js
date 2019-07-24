import { connect } from 'react-redux'

import Search from './Search';
import { startChat } from '../../redux/actions';

const mapStateToProps = state => {
    // TODO: pass logged in user data
    return {
      user: state.user.data,
      userError: state.user.error
    }
}

const mapDispatchToProps = dispatch => ({
  // TODO: action to start chat
  startChat: (withUser) => {
    dispatch(startChat(withUser));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);