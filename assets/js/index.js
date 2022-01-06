import React from 'react';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import { Provider } from 'react-redux'
import App from './app/App';
import { persistor, store } from './store';
import history from './history';
import ReduxToastr from 'react-redux-toastr';
import { setAxiosInterceptor } from './app/utils/AxiosInterceptor.js';
import LoaderContainer from './app/common/Loader/LoaderContainer';
import { PersistGate } from 'redux-persist/lib/integration/react';
//import 'semantic-ui-css/semantic.min.css';

setAxiosInterceptor();

ReactDOM.render(
    //Provider przekazuje stan ze stora do komponentow
    < Provider store={store} >
        <PersistGate persistor={persistor} >
            <Router history={history}>
                <LoaderContainer />
                <ReduxToastr
                    position='top-center'
                    preventDuplicates
                    timeOut={3000} />
                <App />
            </Router>
        </PersistGate>
    </Provider>,
    document.getElementById('root'));

