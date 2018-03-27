import React from 'react';
import {Redirect} from 'react-router-dom';
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Grid,
    Row,
    Col,
    Button,
    Alert,
} from 'react-bootstrap';
import {request} from "../common";

const FieldGroup = ({id, label, help, validationState, ...props}) =>
    <FormGroup controlId={id} validationState={validationState}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        <FormControl.Feedback/>
        {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>;

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        validation: null,
        errorMessage: null,
        redirect: null,
    };

    onInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    onFormSubmit = async (e) => {
        e.preventDefault();
        let errorMessage = null;
        let redirect = false;
        if (
            (this.validationState('email') === 'success' || this.validationState('email') === null) &&
            (this.validationState('password') === 'success' || this.validationState('password') === null)
        ) {
            let result = false;
            try {
                result = await request('/api/login', 'post', {
                    email: this.state.email,
                    password: this.state.password
                });
            } catch (error) {
                result = error;
            }

            console.log(result);

            if (result.status === 200 && result.data.token) {
                this.props.saveToken(result.data.token);
                redirect = '/';
            } else {
                errorMessage = result.error;
            }

        } else {
            console.log('nothing to do');
        }
        this.setState({
            validation: true,
            errorMessage,
            redirect,
        });
    };

    validationState = (field) => {
        if (this.state.errorMessage) return null;
        if (this.state[field].length === 0) return 'error';
        return 'success';
    };

    render() {
        return (
            <div>
                {this.state.redirect && <Redirect to={this.state.redirect}/>}
                <h1>Login</h1>
                <Grid>
                    <Row>
                        <Col md={6} mdOffset={3}>
                            {this.state.errorMessage && <Alert bsStyle="danger">{this.state.errorMessage}</Alert>}
                            <form onChange={this.onInputChange}
                                  onSubmit={this.onFormSubmit}>
                                <FieldGroup id="email"
                                            type="text"
                                            label="E-mail cím"
                                            validationState={this.state.validation && this.validationState('email')}
                                            value={this.state.email}
                                            placeholder="valami@domain.com"
                                            help=""/>
                                <FieldGroup id="password"
                                            type="password"
                                            label="Jelszó"
                                            validationState={this.state.validation && this.validationState('password')}
                                            value={this.state.password}
                                            help=""/>
                                <Button type="submit"
                                        block={true}
                                        bsStyle={'primary'}
                                        bsSize={'large'}>Belépés</Button>
                            </form>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Login;
