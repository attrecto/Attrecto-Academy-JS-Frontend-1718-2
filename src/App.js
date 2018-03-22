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
} from 'react-router-dom';
import {
    LinkContainer,
    IndexLinkContainer
} from 'react-router-bootstrap';

import Home from './components/Home';
import Users from './components/Users';
import Badges from './components/Badges';
import Login from './components/Login';

class App extends React.Component {
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
                        <Nav pullRight>
                            <LinkContainer to="/login">
                                <NavItem eventKey={3}>Login</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/logout">
                                <NavItem eventKey={4}>Logout</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar>

                    <Grid>
                        <Row>
                            <Col xs={12}>
                                <Route exact path="/" component={Home}/>
                                <Route path="/users" component={Users}/>
                                <Route path="/badges" component={Badges}/>
                                <Route path="/login" component={Login}/>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </Router>
        );
    }
}

export default App;
