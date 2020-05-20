import React from 'react';
import './styles.css';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

class Navbar extends React.Component {
    constructor() {
        super();
        this.state = {
            authenticated: null,
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.setState({ authenticated: true });
        } else this.setState({ authenticated: false });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.setState({ authenticated: true });
        } else this.setState({ authenticated: false });
    }

    render() {
        const { authenticated } = this.state;
        return (
            <nav
                className="navbar is-dark is-transparent"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img
                            src={require('./favicon.ico')}
                            className="nav-logo"
                        />
                    </a>

                    <a
                        role="button"
                        className="navbar-burger burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample"
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item" href="/">
                            Home
                        </a>
                        <a className="navbar-item" href="/about">
                            About
                        </a>
                        <a className="navbar-item" href="/editor-demo">
                            Editor
                        </a>
                        {authenticated ? (
                            <a className="navbar-item" href="/practice">
                                Practice
                            </a>
                        ) : null}
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            {authenticated ? (
                                <div>
                                    <a
                                        className="navbar-item"
                                        href="/dashboard"
                                    >
                                        Dashboard
                                    </a>
                                </div>
                            ) : (
                                <div className="buttons">
                                    <a
                                        className="button is-primary"
                                        href="/register"
                                    >
                                        <strong>Sign up</strong>
                                    </a>
                                    <a
                                        className="button is-light"
                                        href="/login"
                                    >
                                        Log in
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(Navbar);
