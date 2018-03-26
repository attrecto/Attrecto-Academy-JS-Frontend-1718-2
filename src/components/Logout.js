import React from 'react';
import {Redirect} from 'react-router-dom';

class Logout extends React.Component {
    componentDidMount() {
        this.props.removeToken();
    }

    render() {
        return (
            <Redirect to={'/'}/>
        );
    }
}

export default Logout;
