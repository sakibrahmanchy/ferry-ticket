import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers'; 
import Router from './Router';
import AutoCompleteListView from './components/AutoCompleteListView';

class App extends Component {
    
    render() {
        console.disableYellowBox = true;   
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
           <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;