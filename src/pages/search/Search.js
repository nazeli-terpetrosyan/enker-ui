import React from 'react';
import PropTypes from 'prop-types';
import Socket from '../../socket';
import {Form, Button, InputGroup, ListGroup, Badge} from 'react-bootstrap';


import './search.css';

/**
 * React component to render search page
 */
class Search extends React.Component {
  constructor(props) {
    // TODO: set default state of list of users, and text search, event handler and socket connect 
    super(props);
    this.state = {
      query: null,
      list: null
    };
    this.handleChange=this.handleChange.bind(this);
  }
  componentDidMount() {
    // TODO: event handlers if user logged in or out, run query
  }
  handleSubmit(event) {
    // TODO: form submit
  }
  handleChange(type, value) {
    this.setState({
      [type]: value
    });
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
  query() {
    // TODO: emit query via Socket based on text
    Socket.connect(users => {
      users.emit('search', this.state.query, (results) => {
        this.state.list=results;
      });
    });
  }
  render() {
    return (
      <div className="contain4">
        <div className="search_p">
          <div className="search">
          <InputGroup className="mb-3">
            <Form.Control onChange={(e) => { this.handleChange("query", e.target.value) }}
              placeholder="Search by Name, Email, Location and Learning Targets"
              aria-label="Search by Name, Email, Location and Learning Targets"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button onClick={() => { this.query()}} variant="success">Search</Button>
            </InputGroup.Append>
        </InputGroup>
          </div>
          <div className="users">
            <ListGroup>
              {this.state.list.map((user, index) => {
                <ListGroup.Item eventKey={`#user${index}`} as="button" >
                  <span>{user.firstName} {user.lastName}</span>
                  {user.loggedIn ? <Badge className="ml-2" variant="success">Logged In</Badge>: null}
                </ListGroup.Item>
              })}
            </ListGroup>
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