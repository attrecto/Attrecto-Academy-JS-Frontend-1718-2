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
} from 'react-router-dom';
import {
    LinkContainer,
    IndexLinkContainer,
} from 'react-router-bootstrap';

import Home from './components/Home';
import Users from './components/Users';
import Badges from './components/Badges';
import Login from './components/Login';
import NotFound from './components/NotFound';

class App extends React.Component {
    state = {
        token: null,
    };

    saveToken = (token) => {
        this.setState({token});
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
                        {this.state.token &&
                        <Nav>
                            <IndexLinkContainer to="/">
                                <NavItem eventKey={0}>Home</NavItem>
                            </IndexLinkContainer>
                            <LinkContainer to="/users">
                                <NavItem eventKey={1}>Users</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/badges">
                                <NavItem eventKey={2}>Badges</NavItem>
                            </LinkContainer>
                        </Nav>
                        }
                        <Nav pullRight>
                            {!this.state.token &&
                            <LinkContainer to="/login">
                                <NavItem eventKey={3}>Login</NavItem>
                            </LinkContainer>
                            }
                            {this.state.token &&
                            <LinkContainer to="/logout">
                                <NavItem eventKey={4}>Logout</NavItem>
                            </LinkContainer>
                            }
                        </Nav>
                    </Navbar>

                    <Grid>
                        <Row>
                            <Col xs={12}>
                                <Switch>
                                    <Route exact path="/" component={Home}/>
                                    {this.state.token && <Route path="/users" component={Users}/>}
                                    {this.state.token && <Route path="/badges" component={Badges}/>}
                                    {!this.state.token &&
                                    <Route
                                        path="/login"
                                        render={(props) =>
                                            <Login
                                                saveToken={this.saveToken} {...props}/>
                                        }
                                    />
                                    }
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
