import React from 'react'
import { render } from 'react-dom'
import { ConnectedRouter } from 'react-router-redux'
import configureStore from './store/Store'
import { Provider } from 'react-redux'
import { history } from './store/Store'
import App from './App'
import ReactGA from 'react-ga'

import './semantic/dist/semantic.min.css';
import './index.css'

const store = configureStore()

ReactGA.initialize('UA-114846920-1')

history.listen((location, action) => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
});

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App history={history}/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default
        render(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <NextApp history={history}/>
                </ConnectedRouter>
            </Provider>,
            document.getElementById('root')
        );
    });
    window.store = store;
}

//
//
//
//
//
// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
