import React from 'react';
import {withRouter} from 'react-router-dom';

class Logout extends React.Component {
    componentDidMount() {
        this.props.removeToken();
        this.props.history.push('/');
    }

    render() {
        return (
            <div/>
        );
    }
}

export default withRouter(Logout);
