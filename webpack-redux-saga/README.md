이 프로젝트는 [webpack-sample](https://github.com/LeeHyun-A/React/tree/master/webpack-plus)을 기반으로 Redux-Saga를 적용한 프로젝트입니다.
> CRA에 Redux-Saga를 적용한 예제 코드는 [cra-redux-saga](https://github.com/LeeHyun-A/cra-redux-saga)을 참고하세요.
 
 ## 설치
```
npm i redux react-redux redux-saga -D 
npm i @babel/polyfill // not devDependencies
```

## webpack.config.js
```
...
entry: {
    index: [
        '@babel/polyfill',
        PATH_SOURCE + '/index/index.js'
    ]
},
...
```
- webpack entry: [Entry Points](https://webpack.js.org/concepts/entry-points/)
- @babel/polyfill: [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill/)

## actions
```
// src/actions.js
export const REQUEST_API_DATA = 'REQUEST_API_DATA';
export const RECEIVE_API_DATA = 'RECEIVE_API_DATA';

export const requestApiData = () => ({type: REQUEST_API_DATA});
export const receiveApiData = data => ({type: RECEIVE_API_DATA, data});
```

## reducers
### data.js
```
// src/reducers/data.js
import { RECEIVE_API_DATA from '../actions';

export default (state = {}, { type, data }) => {
    switch (type) {
        case RECEIVE_API_DATA:
            return data;
        default:
            return state;
    }
}; 
```
### index.js
```
// src/reducers/index.js
import { combineReducers } from 'redux';
import data from './data';

export default combineReducers({
    data
}); 
```

## api.js
```
export const fetchData = async = () => {
    try {
        const response = await fetch("https://randomuser.me/api");
        return await response.json();
    } catch (e) {
        console.log(e);
    }
};
```

## sagas.js
```
// src/sagas.js
import { cass, put, tageLatest } from 'redux-saga/effects';
import { REQUEST_API_DATA, receiveApiData } from './actions';
import { fetchData } from './api';

function* getApiData(action) {
    try {
        const data = yield call(fetchData);
        yield put(receiveapiData(data));
    } catch (e) {
        console.error(e);
    }
}

export default function* mySaga() {
    yield takeLatest(REQUEST_API_DATa, getApiData);
}
```
[redux-saga/effects](https://redux-saga.js.org/docs/api/)에는 여러가지가 있다.
> <b>call(fn, ...args)</b><br>
> Creates an Effect description that instructs the middleware to call the function fn with args as arguments.
> - `fn`: Function - A Generator function, or normal function which either returns a Promise as result, or any other value.
> - `args`: Array<any> - An array of values to be passed as arguments to fn

> <b>put(action)</b><br>
> Creates an Effect description that instructs the middleware <i>to dispatch an action to the Store</i>. This effect is non-blocking and any errors that are thrown downstream (e.g. in a reducer) will not bubble back into the saga.
> - `action`: Object - see Redux dispatch documentation for complete info

만약 여러개의 saga를 추가하고 싶은 경우 `all` ([all](https://github.com/redux-saga/redux-saga/issues/160#issuecomment-307571438))을 사용하자

## store.js
```
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import mySaga from './sagas';

const sagaMiddleWare = createSagaMiddleware();

export default createStore(reducer, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(mySaga);
```

## components
### index.js
```
// src/index/index.js
...
import { Provider } from 'react-redux';
import store from '../store';
...

ReactDOM.render(
    <Provider store={store}>
        <Hello />
    </Provider>,
    document.getElementById('root')
);
```

### Hello.js
```
// src/index/components/Hello.js
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { requestApiData } from '../../actions';

class Hello extends Component {
    componentDidMount() {
        console.log('good');
        this.props.requestApiData();
    }
    
    person = (x, i) =>
        <div key={x.id.value}>
            <h1>{x.gender}</h1>
            <h1>{x.name.first}</h1>
            <h1>{x.name.last}</h1>
            <img src={x.picture.medium}/>
        </div>;
    
    render() {
        const { results = [] } = this.props.data;
        
        return (
            results.length
                ? <h1>
                    {results.map(this.person)}
                  </h1>
                : <h1>loading...</h1>
        )
    }
}

const mapStateProps = state => ({ data: state.data });

const mapDispatchToProps = dispatch =>
    bindActionCreators({ requestApiData }, dispatch);
    
export default connect(mapStateProps, mapDispatchToProps)(Hello);
```
