import React from 'react';
import {Table, Button, Modal, Alert} from 'react-bootstrap';
import {request} from "../common";
import {SelectGroup} from "./FieldGroup";

class Users extends React.Component {
    state = {
        users: [],
        userIdForAddModal: false,
        badges: [],
        badgeId: '',
        validation: null,
        idsForDeleteModal: false,
        errorMessage: '',
    };

    componentDidMount() {
        this.getUserList();
        this.getBadgeList();
    }

    getBadgeList = async () => {
        try {
            const result = await request('/api/badge', 'get');
            this.setState({badges: result.data});
        } catch (error) {
            console.error(error);
        }
    };

    showAddModal = (userId) => () => {
        this.setState({userIdForAddModal: userId});
    };

    hideAddModal = () => {
        this.setState({
            userIdForAddModal: false,
            validation: null,
            badgeId: '',
            errorMessage: '',
        });
    };

    onInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    onFormSubmit = async (e) => {
        e.preventDefault();

        if (
            this.validationState('badgeId') === 'success'
        ) {
            try {
                await request('/api/user/' + this.state.userIdForAddModal + '/badge/' + this.state.badgeId, 'post');
                this.getUserList();
                this.hideAddModal();
            } catch (error) {
                this.setState({
                    validation: true,
                    errorMessage: error.error,
                });
                console.error(error);
            }
        } else {
            this.setState({
                validation: true,
            });
        }
    };

    validationState = (field) => {
        if (!this.state[field]) return 'error';
        return 'success';
    };

    getUserList = async () => {
        try {
            const result = await request('/api/user', 'get');
            this.setState({users: result.data});
        } catch (error) {
            console.error(error);
        }
    };

    showDeleteModal = (userId, badgeId) => () => {
        this.setState({idsForDeleteModal: {userId, badgeId}});
    };

    hideDeleteModal = () => {
        this.setState({idsForDeleteModal: false});
    };

    deleteBadge = async () => {
        try {
            await request('/api/user/' + this.state.idsForDeleteModal.userId + '/badge/' + this.state.idsForDeleteModal.badgeId, 'delete');
            this.getUserList();
        } catch (error) {
            console.error(error);
        }
        this.setState({idsForDeleteModal: false});
    };

    render() {
        return (
            <div>
                {this.state.userIdForAddModal &&
                <Modal show={!!this.state.userIdForAddModal}
                       onHide={this.hideAddModal}>
                    <form onChange={this.onInputChange}
                          onSubmit={this.onFormSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add user badge</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.errorMessage && <Alert
                                bsStyle="danger">{this.state.errorMessage}</Alert>}
                            <SelectGroup id="badgeId"
                                         label="Badge"
                                         validationState={this.state.validation && this.validationState('badgeId')}
                                         value={this.state.badgeId}>
                                <option value=""/>
                                {this.state.badges.map(badge => <option
                                    value={badge.id}
                                    key={`badge_${badge.id}`}>{badge.name}</option>)}
                            </SelectGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit"
                                    bsStyle={'primary'}>Add</Button>
                            <Button onClick={this.hideAddModal}>Cancel</Button>
                        </Modal.Footer>
                    </form>
                </Modal>}

                {this.state.idsForDeleteModal &&
                <Modal show={!!this.state.idsForDeleteModal}
                       onHide={this.hideDeleteModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete user badge</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete the badge?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.deleteBadge}
                                bsStyle={'danger'}>Yes</Button>
                        <Button onClick={this.hideDeleteModal}
                                bsStyle={'primary'}>No</Button>
                    </Modal.Footer>
                </Modal>}

                <h1>Users</h1>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Badges</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.map(user => <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            {user.badges.map(badge =>
                                <div key={`user_${user.id}_badge_${badge.id}`}
                                     style={{marginBottom: '5px'}}>
                                    <Button bsStyle="danger"
                                            bsSize="xsmall"
                                            style={{float: 'right'}}
                                            onClick={this.showDeleteModal(user.id, badge.id)}>X</Button>
                                    <div>{badge.name}</div>
                                </div>
                            )}
                            <Button bsSize="xsmall"
                                    block
                                    onClick={this.showAddModal(user.id)}>Add badge</Button>
                        </td>
                    </tr>)}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Users;
