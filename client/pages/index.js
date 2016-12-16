import React, { PropTypes, Component } from 'react';
import { Provider } from 'react-redux';
import Head from 'next/head';
import { reducer, initStore, emptyState } from '../state/store';
import LoginForm from '../containers/LoginForm';

export default class Index extends Component {
  static propTypes = {
    isServer: PropTypes.bool,
    initialState: PropTypes.shape({
      auth: PropTypes.object,
    }),
  }

  static getInitialProps({ req }) {
    const isServer = Boolean(req);
    const store = initStore(reducer, emptyState, isServer);

    return { initialState: store.getState(), isServer };
  }

  constructor(props) {
    super(props);
    this.store = initStore(reducer, props.initialState, props.isServer);
  }

  render() {
    return (
      <Provider store={this.store}>
        <div className="wrapper">
          <Head>
            <title>Isomorphic Redux Auth</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Lato:400,900" rel="stylesheet" />
          </Head>
          <div className="container">
            <LoginForm />
          </div>

          <style jsx>{`
            .wrapper {
              padding: 0 1rem;
              height: 100vh;
              background-image: linear-gradient(-151deg, #25528B 0%, #103C73 100%);
              overflow-y: auto;
              align-items: center;
            }

            .container {
              max-width: 240px;
              margin: 0 auto;
              margin-top: 3rem;
              background: white;
              border-radius: 0.2rem;
              box-shadow: 0 0 2rem rgba(0, 0, 0, 0.4);
              padding: 2rem;
            }
          `}</style>
        </div>
      </Provider>
    );
  }
}
