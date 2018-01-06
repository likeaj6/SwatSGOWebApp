// import React from 'react'
// import { render } from 'react-dom'
// import { Provider } from 'react-redux'
// import { ConnectedRouter } from 'react-router-redux'
// import Store, { history } from './store/Store'
// import App from './containers/app'
//
// import './index.css'
//
// const target = document.querySelector('#root')
//
// render(
//   <Provider store={Store}>
//     <ConnectedRouter history={history}>
//       <div>
//         <App />
//       </div>
//     </ConnectedRouter>
//   </Provider>,
//   target
// )






import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
