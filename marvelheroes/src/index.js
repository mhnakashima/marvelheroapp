import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import App from './App';
import Hero from './components/Hero/Hero';
import Notfound from './components/NotFound/NotFound';
import './index.css';
import * as serviceWorker from './serviceWorker';

const routing = (

    <Router>
        <div className="Main">
            <div className="header">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">
                        <span className="mainLogo"></span>
                    </a>

                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                        </ul>

                    </div>
                </nav>
            </div>

            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/home/" component={App} />
                <Route path="/heroes/:id" component={Hero} />
                <Route component={Notfound} />
            </Switch>
        </div>
    </Router>

)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
