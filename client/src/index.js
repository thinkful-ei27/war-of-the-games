import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/app';
import TestComponent from './components/testComponent'
import store from './store';
import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <TestComponent />
            {/* <App /> */}
        </Router>
    </Provider>,
    document.getElementById('root')
);
