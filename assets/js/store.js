import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducer';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger'; //pozwala wyświetlac stan bieżący poprzedni i nastepny w konsoli
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};

const pReducer = persistReducer(persistConfig, rootReducer); //pozwala przechowywac stan po odświeżeniu strony

export const store = createStore(pReducer, applyMiddleware(ReduxThunk, logger));
export const persistor = persistStore(store);