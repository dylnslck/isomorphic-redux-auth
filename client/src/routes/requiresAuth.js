import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default function requiresAuth(WrappedComponent) {
  class AuthenticatedComponent extends Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool,
    };

    constructor(props) {
      super(props);
      this.checkAndRedirect = this.checkAndRedirect.bind(this);
    }

    componentDidMount() {
      this.checkAndRedirect();
    }

    componentDidUpdate() {
      this.checkAndRedirect();
    }

    checkAndRedirect() {
      if (!this.props.isAuthenticated) browserHistory.push('/');
    }

    render() {
      return (
        this.props.isAuthenticated ? <WrappedComponent {...this.props} /> : null
      );
    }
  }

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.get('isAuthenticated'),
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
}
