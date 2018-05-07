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

class Badge extends React.Component {
    state = {
        id: null,
        name: '',
        description: '',
        errorMessage: null,
    };

    componentDidMount() {
        if (this.props.match.params.id) {
            this.getBadge(this.props.match.params.id);
        }
    }

    getBadge = async (id) => {
        try {
            const result = await request('/api/badge/' + id, 'get');
            this.setState({
                id: result.data.id,
                name: result.data.name,
                description: result.data.description,
            });
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    onInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    onFormSubmit = async (e) => {
        e.preventDefault();

        if (
            this.validationState('name') === 'success' &&
            this.validationState('description') === 'success'
        ) {
            try {
                let method = 'post';
                let url = '/api/badge';
                const payload = {
                    name: this.state.name,
                    description: this.state.description,
                };
                if (this.state.id) {
                    payload.id = this.state.id;
                    method = 'PATCH';
                    url += '/' + this.state.id;
                }
                await request(url, method, payload);
                this.props.history.push('/badges');
            } catch (error) {
                console.error(error);
                this.setState({errorMessage: error.error});
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
                <h1>Edit badge</h1>
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
                                <FieldGroup id="description"
                                            type="textarea"
                                            label="Description"
                                            validationState={this.state.validation && this.validationState('description')}
                                            value={this.state.description}/>
                                <Button type="submit"
                                        block={true}
                                        bsStyle={'primary'}
                                        bsSize={'large'}>Save</Button>
                            </form>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default withRouter(Badge);
