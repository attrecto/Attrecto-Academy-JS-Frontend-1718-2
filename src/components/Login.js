import React from 'react';
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
    };

    onInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    onFormSubmit = (e) => {
        e.preventDefault();
        if (this.validationState('email') === 'success' && this.validationState('password') === 'success') {
            console.log('ws call');
        } else {
            console.log('nothing');
        }
    };

    validationState = (field) => {
        if (this.state[field].length === 0) return null;
        return 'success';
    };

    render() {
        return (
            <div>
                <h1>Login</h1>
                <Grid>
                    <Row>
                        <Col md={6} mdOffset={3}>
                            <form onChange={this.onInputChange}
                                  onSubmit={this.onFormSubmit}>
                                <FieldGroup id="email"
                                            type="text"
                                            label="E-mail cím"
                                            validationState={this.validationState('email')}
                                            value={this.state.email}
                                            placeholder="valami@domain.com"
                                            help="Ide lehet írni egy kis segítséget"/>
                                <FieldGroup id="password"
                                            type="password"
                                            label="Jelszó"
                                            validationState={this.validationState('password')}
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
