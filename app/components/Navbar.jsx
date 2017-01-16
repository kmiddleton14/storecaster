import React from 'react';
import ReactDOM from 'react-dom';
const { Component } = React;
import { Link } from 'react-router';
import Login from './Login'
import WhoAmI from './WhoAmI'

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to='/home'>Storecaster</Link>
            </div>

           
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className="active"><Link to='/products'>All Products <span className="sr-only">(current)</span></Link></li>
                
                
              </ul>
              
              <ul className="nav navbar-nav navbar-right">
                <li>{this.props.user ? <WhoAmI/> : <Login/>}</li>
                <li><Link to='cart' className='glyphicon glyphicon-shopping-cart' /></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}