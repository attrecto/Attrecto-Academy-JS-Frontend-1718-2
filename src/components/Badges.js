import React from 'react';
import {Table, Button} from 'react-bootstrap';
import {request} from "../common";

class Badges extends React.Component {
    state = {
        badges: []
    };

    componentDidMount() {
        this.getBadgeList();
    }

    getBadgeList = async () => {
        try {
            const result = await request('/api/badge', 'get');
            this.setState({badges: result.data});
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <div>
                <Button href="/badges/edit" style={{float: "right"}}>Add new badge</Button>
                <h1>Badges</h1>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.badges.map(badge => <tr key={badge.id}>
                        <td>{badge.id}</td>
                        <td><a href={`/badges/edit/${badge.id}`}>{badge.name}</a></td>
                        <td>{badge.description}</td>
                    </tr>)}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Badges;
