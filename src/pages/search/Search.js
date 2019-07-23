import React from 'react';
import PropTypes from 'prop-types';
// TODO: use --> import Socket from '../../socket';
import {Form, Button, InputGroup, ListGroup} from 'react-bootstrap';


import './search.css';

/**
 * React component to render search page
 */
class Search extends React.Component {
  // constructor() {
    // TODO: set default state of list of users, and text search, event handler and socket connect 
  // }
  componentDidMount() {
    // TODO: event handlers if user logged in or out, run query
  }
  handleSubmit(event) {
    // TODO: form submit
  }
  onStudentLoggedIn() {
    // TODO: Socket event handler if user logged in - run query
  }
  onStudentLoggedOut() {
    // TODO: Socket event handler if user logged out - run query
  }
  onstartChat(withUser) {
    // TODO: event to invoke start-chat action via Socket, redirect to /network page
  }
  query(textSearch) {
    // TODO: emit query via Socket based on text
  }
  render() {
    return (
      <div className="contain4">
        <div className="search_p">
          <div className="search">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search by Name, Email, Location and Learning Targets"
              aria-label="Search by Name, Email, Location and Learning Targets"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button variant="success">Search</Button>
            </InputGroup.Append>
        </InputGroup>
          </div>
          <div className="users">

          </div>
          <div className="user_info"> 

          </div>
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  startChat: PropTypes.func,
  currentUser: PropTypes.object,
};
export default Search;