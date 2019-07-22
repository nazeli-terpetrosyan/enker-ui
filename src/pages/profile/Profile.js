import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import { Form, Alert, Button} from 'react-bootstrap';

/**
 * React component for Profile page
 */
class Profile extends Component {
  constructor(props) {
    // TODO: set state based on props, drop down values for learningTargets, locations, form event handlers
    super(props);
    this.learningTargets = ["Animation", "Game Development", "Filmmaking", "Web Development"]
    this.locations = ["Yerevan",  "Gyumri", "Stepnakert", "Dilijan"]
    this.state = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      learningTargets: user.learningTargets,
      location: user.location
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    // TODO: EXTRA WORK - handle form submit (if doing updates)
    e.preventDefault();
    this.props.updateUser(this.state);
  }
  handleChange(type, value) {
    // TODO: EXTRA WORK - handle form change to set state (if doing updates)
    if (type === "learningTargets") {
      const valueAsArray = Array.from(value); // Convert HTMLCollections to Array
      const learningTargets = valueAsArray.filter(v => v.selected).map(v => v.value); // Filter and map to option value
      this.setState({
        learningTargets,
      })
    } else {
      this.setState({
        [type]: value
      });
    } 
  }
  render() {
  // TODO: use to redirect to home page if user not logged in
    if (this.props.user) {
      return (
        <Redirect to={{
          pathname: '/profile',
        }} />
      )
    }
    return (
      <div className="contain3">
      <div className="prof_page">
        <h1 className="p_page_l">Profile Page</h1>
        <Form className="mt-5" onSubmit={e => this.handleSubmit(e)}>
          {
            this.props.userError ? 
              <Alert variant="danger">{this.props.userError}</Alert>  : null
          }
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control onChange={(e) => { this.handleChange("firstName", e.target.value) }} type="text" placeholder="Enter first name" value={user.firstName}/>
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control onChange={(e) => { this.handleChange("lastName", e.target.value) }} type="text" placeholder="Enter last name" value={user.lastName} />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={(e) => { this.handleChange("email", e.target.value) }} type="email" placeholder="Enter email" value={user.email} />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Passoword</Form.Label>
            <Form.Control onChange={(e) => { this.handleChange("password", e.target.value) }} type="password" placeholder="Enter password" value={user.password} />
          </Form.Group>
          <Form.Group controlId="formLearningTarget">
            <Form.Label>Learning Targets</Form.Label>
            <Form.Control onChange={(e) => { this.handleChange("learningTargets", e.target.options) }} as="select" value={user.learningTargets} multiple>
              {
                this.learningTargets.map(target => 
                  <option key={target}>{target}</option>
                )
              }
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control value={this.state.location} onChange={(e) => { this.handleChange("location", e.target.value) }} as="select" value={user.location}>
              {
                this.locations.map(location => 
                  <option key={location}>{location}</option>
                )
              }
            </Form.Control>
          </Form.Group>
          <Button onClick={(e) => {this.handleSubmit(e)}} className="but2" variant="primary" type="submit">
            Sign up
          </Button>
        </Form>
      </div>    
      </div>  
    )
  }
  }

Profile.propTypes = {
  updateUser: PropTypes.func,
  user: PropTypes.object,
  userError: PropTypes.string,
}

export default Profile;
