import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import * as serviceWorker from './serviceWorker';
import javascript from './components/Javascript';
import python from './components/Python';

const Root = () =>
    <Router>
        <div>

            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">NEWSAPP</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>

                <Navbar.Collapse>
                <Nav>
                    <NavItem>
                        <NavLink exact to="/" activeClassName="active">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink exact to="/javascript" activeClassName="active">Javascript</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink exact to="/python" activeClassName="active">Python</NavLink>
                    </NavItem>
                </Nav>
                </Navbar.Collapse>
                
            </Navbar>
            <Route exact path="/" component={App} />
            <Route exact path="/javascript" component={javascript} />
            <Route exact path="/python" component={python} />
        </div>
    </Router>

const About = () =>
    <div>
        <h1>This is about page ...</h1>
    </div>

//  Root mban edhe App edhe About 
ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();
