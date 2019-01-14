import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import mySaga from './sagas';

const sagaMiddleWare = createSagaMiddleware();

export default createStore(reducer, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(mySaga);
