import { Redirect, Route } from 'react-router'
import { connect } from 'react-redux'
import Newsfeed from '../pages/Newsfeed'

const mapStateToProps = ({ rawgState, localState }) => {
  return {
    rawgState,
    localState
  }
}

function ProtectedRoute(props) {
  let user = props.localState.user
  let authenticated = props.localState.authenticated
  return (
    <Route
      render={() =>
        user && authenticated ? <Newsfeed /> : <Redirect to="/register" />
      }
    />
  )
}
export default connect(mapStateToProps)(ProtectedRoute)
