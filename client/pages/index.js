import React, { PropTypes, Component } from 'react';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import Head from 'next/head';
import { reducer, initStore, emptyState, rootSaga } from '../state/store';
import LoginForm from '../containers/LoginForm';

export default class Index extends Component {
  static propTypes = {
    isServer: PropTypes.bool,
    url: PropTypes.object, // eslint-disable-line
    sagaMiddleware: PropTypes.object, // eslint-disable-line
    initialState: PropTypes.shape({
      auth: PropTypes.object,
    }),
  }

  static getInitialProps({ req }) {
    const isServer = Boolean(req);
    const sagaMiddleware = createSagaMiddleware();
    const store = initStore(reducer, emptyState, sagaMiddleware, isServer);

    console.log('running root saga get initial props');
    sagaMiddleware.run(rootSaga);
    return { initialState: store.getState(), isServer };
  }

  constructor(props) {
    super(props);
    const sagaMiddleware = createSagaMiddleware();

    console.log('running root saga constructor');
    sagaMiddleware.run(rootSaga);
    this.store = initStore(reducer, props.initialState, sagaMiddleware, props.isServer);
  }

  render() {
    const { url } = this.props;

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
            <LoginForm pushTo={url.pushTo} />
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
