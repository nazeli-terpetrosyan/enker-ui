import { connect } from 'react-redux'

import Network from './Network';

const mapStateToProps = state => {
  /**
   * TODO: pass in logged in user, and peer user
   */
  return {
    user: state.user.data,
    userError: state.user.error,
    withUser: state.network.withUser,
    reciever: state.network.reciever
  }
}

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Network);
