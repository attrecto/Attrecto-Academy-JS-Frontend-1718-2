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
import Login from './components/Login';
import Logout from './components/Logout';
import NotFound from './components/NotFound';

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
                        {this.state.token && <Nav pullRight>
                            <LinkContainer to="/logout">
                                <NavItem eventKey={4}>Logout</NavItem>
                            </LinkContainer>
                        </Nav>}
                    </Navbar>

                    <Grid>
                        <Row>
                            <Col xs={12}>
                                <Switch>
                                    {this.state.token && <Redirect exact from={'/'} to={'/users'}/>}
                                    {this.state.token && <Route path="/users" component={Users}/>}
                                    {this.state.token && <Route path="/badges" component={Badges}/>}
                                    {this.state.token && <Route
                                        path="/logout"
                                        render={() => <Logout removeToken={this.removeToken}/>}
                                    />}
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
