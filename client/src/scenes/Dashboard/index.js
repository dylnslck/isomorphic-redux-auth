import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import mapDispatchToProps from './mapDispatchToProps';
import mapStateToProps from './mapStateToProps';

class Dashboard extends Component {
  static propTypes = {
    time: PropTypes.string,
    isTimeLoading: PropTypes.bool,
    version: PropTypes.string,
    isVersionLoading: PropTypes.bool,
    path: PropTypes.string,
    isPathLoading: PropTypes.bool,
    user: PropTypes.object, // eslint-disable-line

    getServerTime: PropTypes.func,
    getServerVersion: PropTypes.func,
    getServerPath: PropTypes.func,
  }

  componentDidMount() {
    this.props.getServerVersion();
    this.props.getServerPath();
    this.interval = setInterval(this.props.getServerTime, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      time,
      isTimeLoading,
      version,
      isVersionLoading,
      path,
      isPathLoading,
      user,
    } = this.props;

    return (
      <div className="wrapper">
        <div className="container">
          <p>Welcome back {user.username}</p>
          <p>Server time: {isTimeLoading ? 'Loading...' : time}</p>
          <p>Server version: {isVersionLoading ? 'Loading...' : version}</p>
          <p>Server path: {isPathLoading ? 'Loading...' : path}</p>
        </div>

        <style jsx>{`
          .wrapper {
            height: 100vh;
            background-image: linear-gradient(-151deg, #25528B 0%, #103C73 100%);
            padding: 1rem;
            overflow-y: auto;
          }

          .container {
            max-width: 480px;
            margin: 0 auto;
            margin-top: 3rem;
            background: white;
            border-radius: 0.2rem;
            box-shadow: 0 0 2rem rgba(0, 0, 0, 0.4);
            padding: 2rem;
          }
        `}</style>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
