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
} from 'react-bootstrap';

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
        redirect: null,
    };

    onInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    onFormSubmit = (e) => {
        e.preventDefault();
        this.setState({validation: true});
        if (this.validationState('email') === 'success' && this.validationState('password') === 'success') {
            console.log('api call');
            const token = '123';
            this.props.saveToken(token);
            this.setState({redirect: '/'});
        } else {
            console.log('nothing to do');
        }
    };

    validationState = (field) => {
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
                            <form onChange={this.onInputChange}
                                  onSubmit={this.onFormSubmit}>
                                <FieldGroup id="email"
                                            type="text"
                                            label="E-mail cím"
                                            validationState={this.state.validation && this.validationState('email')}
                                            value={this.state.email}
                                            placeholder="valami@domain.com"
                                            help="Ide lehet írni egy kis segítséget"/>
                                <FieldGroup id="password"
                                            type="password"
                                            label="Jelszó"
                                            validationState={this.state.validation && this.validationState('password')}
                                            value={this.state.password}
                                            help="Ide is lehet írni egy kis segítséget"/>
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
