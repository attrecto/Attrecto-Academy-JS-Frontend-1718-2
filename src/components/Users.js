import React from 'react';
import {Table, Button, Modal} from 'react-bootstrap';
import {request} from "../common";

class Users extends React.Component {
    state = {
        users: []
    };

    componentDidMount() {
        this.getUserList();
    }

    getUserList = async () => {
        try {
            const result = await request('/api/user', 'get');
            this.setState({users: result.data});
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <div>
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
                        <td><a href={`/users/${user.id}`}>{user.name}</a></td>
                        <td>{user.email}</td>
                        <td>
                            {user.badges.map(badge =>
                                <div key={`user_${user.id}_badge_${badge.id}`} style={{marginBottom: '5px'}}>
                                    <Button bsStyle="danger" bsSize="xsmall" style={{float: 'right'}} onClick={this.showDeleteModal(user.id, badge.id)}>X</Button>
                                    <div>{badge.name}</div>
                                </div>
                            )}
                            <Button bsSize="xsmall" block>Add badge</Button>
                        </td>
                    </tr>)}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Users;
