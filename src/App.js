import React from 'react';
import {
    Navbar,
    Nav,
    NavItem,
    Row,
    Grid,
    Col,
} from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
} from 'react-router-dom';
import {
    LinkContainer,
} from 'react-router-bootstrap';

import Users from './components/Users';
import Badges from './components/Badges';
import Badge from './components/Badge';
import Login from './components/Login';
import Logout from './components/Logout';
import NotFound from './components/NotFound';
import Register from './components/Register';

class App extends React.Component {
    state = {
        token: localStorage.getItem('token'),
    };

    saveToken = (token) => {
        localStorage.setItem('token', token);
        this.setState({token});
    };

    removeToken = () => {
        localStorage.removeItem('token');
        this.setState({token: null});
    };

    render() {
        return (
            <Router>
                <div>
                    <Navbar inverse>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to="/">Badge</Link>
                            </Navbar.Brand>
                        </Navbar.Header>

                        {this.state.token && <Nav>
                            <LinkContainer to="/users">
                                <NavItem eventKey={1}>Users</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/badges">
                                <NavItem eventKey={2}>Badges</NavItem>
                            </LinkContainer>
                        </Nav>}
                        <Nav pullRight>
                            {!this.state.token && <LinkContainer to="/register">
                                <NavItem eventKey={4}>Register</NavItem>
                            </LinkContainer>}
                            {this.state.token && <LinkContainer to="/logout">
                                <NavItem eventKey={4}>Logout</NavItem>
                            </LinkContainer>}
                        </Nav>
                    </Navbar>

                    <Grid>
                        <Row>
                            <Col xs={12}>
                                <Switch>
                                    {this.state.token && <Redirect exact from={'/'} to={'/users'}/>}
                                    {this.state.token && <Route path="/users" component={Users}/>}
                                    {this.state.token && <Route exact path="/badges" component={Badges}/>}
                                    {this.state.token && <Route path="/badges/edit/:id?" component={Badge}/>}
                                    {this.state.token && <Route
                                        path="/logout"
                                        render={() => <Logout removeToken={this.removeToken}/>}
                                    />}
                                    {!this.state.token && <Route path="/register" component={Register}/>}
                                    {!this.state.token && <Route
                                        path="/"
                                        render={() => <Login saveToken={this.saveToken}/>}
                                    />}
                                    <Route path="/" component={NotFound}/>
                                </Switch>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </Router>
        );
    }
}

export default App;
