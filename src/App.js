import React, { Component } from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import General from './pages/General'
import NotFound from './pages/404'
import { Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<Header/>
	        <div className="main">
                <Switch>
                    <Route exact path="/" component={General}/>
                    <Route path="*" component={NotFound} />
                </Switch>
	        </div>
        <Footer/>  
      </div>
    );
  }
}

export default App;
