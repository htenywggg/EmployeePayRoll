import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback} from '@okta/okta-react';


import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Staff from './components/pages/Staff';
import Login from './components/auth/Login';

import './App.css';

function onAuthRequired({history}) {

	history.push('/login');

}

const config = {
  issuer: 'https://dev-647222.okta.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oafezx6pCvVd6zCI356'
}

class App extends Component {
	render() {
		return (

			<Router>

				<Security issuer={config.issuer}
                  client_id={config.client_id}
                  redirect_uri={config.redirect_uri}
                  onAuthRequired = {onAuthRequired}
        		>
        		<div className="App">
					<Navbar/>

					<div className="container">
					<Route path='/' exact={true} component={Home} />
					<SecureRoute path='/staff' exact={true} component={Staff} />


					<Route 
						path='/login' 
						render={() => ( 
							<Login baseUrl='https://dev-647222.okta.com'/>
						)}
					/>
					<Route path ='/implicit/callback' component={ImplicitCallback}/>

					</div>
				</div>
				</Security>
			</Router>
		);
	}
}

export default App;
