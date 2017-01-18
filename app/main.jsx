'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Home from './components/Home'
import Cart from './containers/CartContainer'
import Products from './components/Products'
import SelectedProduct from './components/SelectedProduct'
import Navbar from './components/Navbar'
import Confirmation from './components/Confirmation'

import { loadAllProducts } from './reducers/products'

//materialize
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const App = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <nav>
        <Navbar user={user}/>

      </nav>
      {children}
    </div>
)

const onProductsEnter = function (nextRouterState) {
  store.getState().products.bases.length === 0 && store.dispatch(loadAllProducts());
}

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/cart" component={Cart} />
        <Route path="/products" component={Products} onEnter={onProductsEnter}/>
        <Route path="/selectedproduct" component={SelectedProduct}/>
        <Route path="/confirmation" component={Confirmation} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
