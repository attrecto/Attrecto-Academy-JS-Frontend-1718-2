import React from 'react';
import {withRouter} from 'react-router-dom';
import {
    Grid,
    Row,
    Col,
    Button,
    Alert,
} from 'react-bootstrap';
import {request} from "../common";
import {FieldGroup} from "./FieldGroup";

class Register extends React.Component {
    state = {
        email: '',
        password: '',
        name: '',
        validation: null,
        errorMessage: null,
    };

    onInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    onFormSubmit = async (e) => {
        e.preventDefault();

        if (
            this.validationState('email') === 'success' &&
            this.validationState('password') === 'success' &&
            this.validationState('name') === 'success'
        ) {
            let result = false;
            try {
                result = await request('/api/user', 'post', {
                    email: this.state.email,
                    password: this.state.password,
                    name: this.state.name,
                });
            } catch (error) {
                result = error;
            }

            if (result.status === 200) {
                this.props.history.push('/users');
            } else {
                this.setState({
                    validation: true,
                    errorMessage: result.error,
                });
            }
        } else {
            this.setState({validation: true});
        }
    };

    validationState = (field) => {
        if (this.state[field].length === 0) return 'error';
        return 'success';
    };

    render() {
        return (
            <div>
                <h1>Register</h1>
                <Grid>
                    <Row>
                        <Col md={6} mdOffset={3}>
                            {this.state.errorMessage && <Alert
                                bsStyle="danger">{this.state.errorMessage}</Alert>}
                            <form onChange={this.onInputChange}
                                  onSubmit={this.onFormSubmit}>
                                <FieldGroup id="name"
                                            type="text"
                                            label="Name"
                                            validationState={this.state.validation && this.validationState('name')}
                                            value={this.state.name}/>
                                <FieldGroup id="email"
                                            type="text"
                                            label="E-mail address"
                                            validationState={this.state.validation && this.validationState('email')}
                                            value={this.state.email}
                                            placeholder="valami@domain.com"/>
                                <FieldGroup id="password"
                                            type="password"
                                            label="Password"
                                            validationState={this.state.validation && this.validationState('password')}
                                            value={this.state.password}/>
                                <Button type="submit"
                                        block={true}
                                        bsStyle={'primary'}
                                        bsSize={'large'}>Register</Button>
                            </form>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default withRouter(Register);
