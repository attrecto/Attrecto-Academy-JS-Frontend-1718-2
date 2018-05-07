import React from 'react';
import {Table} from 'react-bootstrap';
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
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.map(user => <tr key={user.id}>
                        <td>{user.id}</td>
                        <td><a href={`/users/${user.id}`}>{user.name}</a></td>
                        <td>{user.email}</td>
                    </tr>)}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Users;
