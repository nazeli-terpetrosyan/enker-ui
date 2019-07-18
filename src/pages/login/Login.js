import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './login.css';

import {Redirect} from 'react-router-dom';
import {Container, Form, Button} from 'react-bootstrap';

/**
 * Component for Login Page
 */
export default class Login extends Component {
  // constructor(props) {
    // TODO: set state and form handlers
  // }
  render() {
    // TODO: use to redirect if user not logged in
    if (this.props.user) {
      return (
        <Redirect to={{
          pathname: '/profile',
        }} />
      )
    }
    return (
        <div className="contain">
        <div className="login">
        <h1 className="lgn_label">Login</h1>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control className="input" type="email" placeholder="Username" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control className="input" type="password" placeholder="Password" />
          </Form.Group>
          <Button className="but" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </div>
        </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func,
  user: PropTypes.object,
  userError: PropTypes.string,
}
