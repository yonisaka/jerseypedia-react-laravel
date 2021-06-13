import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './Header'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Detail from './Detail'
import Cart from './Cart'
import Checkout from './Checkout'

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/home' component={Home}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/product/:id' component={Detail}/>
                    <Route exact path='/keranjang' component={Cart}/>
                    <Route exact path='/checkout' component={Checkout}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}
 
ReactDOM.render(<App />, document.getElementById('app'))

