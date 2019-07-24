import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Socket from '../../socket';
import {Form, Button, InputGroup, ListGroup, Badge, Tab} from 'react-bootstrap';


import './search.css';

/**
 * React component to render search page
 */
class Search extends React.Component {
  constructor(props) {
    // TODO: set default state of list of users, and text search, event handler and socket connect 
    super(props);
    this.state = {
      query: '',
      list: []
    };
    this.handleChange=this.handleChange.bind(this);
    Socket.connect(() => {})
  }
  componentDidMount() {
    // TODO: event handlers if user logged in or out, run query
    this.onStudentLoggedIn();
    this.onStudentLoggedOut();
    this.query();
  }
  handleSubmit(event) {
    // TODO: form submit
    event.preventDefault();
    const searchText = ReactDOM.findDOMNode(this.refs.searchTextRef).value; // different put in slides
    this.query(searchText);
  }
  handleChange(type, value) {
    this.setState({
      [type]: value
    });
  } 
  onStudentLoggedIn() {
    // TODO: Socket event handler if user logged in - run query
    Socket.users.on('logged in', user => {
      this.query(this.state.query);
    });
  }
  onStudentLoggedOut() {
    // TODO: Socket event handler if user logged out - run query
    Socket.users.on('logged out', user => {
      this.query(this.state.query);
    });
  }
  onstartChat(withUser) {
    // TODO: event to invoke start-chat action via Socket, redirect to /network page
    this.props.startChat(withUser);
    Socket.connect(users =>{
      users.emit('start-chat', withUser, this.props.user);
    });
    this.props.history.push('/network');
  }
  query() {
    // TODO: emit query via Socket based on text
    Socket.connect(users => {
      users.emit('search', this.state.query, (results) => {
        if (this.props.currentUser) {
          results = results.filter(r => this.props.currentUser.email !== r.email)
        }
        this.setState({
          list: results
        });
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
          <Tab.Container defaultActiveKey="#user0">
          <div className="users">
          <ListGroup>
                {this.state.list.map((user, index) => (
                  <ListGroup.Item
                    eventKey={`#user${index}`} as="button">
                    <span>{user.firstName} {user.lastName}</span> 
                    {user.loggedIn ? <Badge className="ml-2" variant="success">Logged In</Badge> : null}
                  </ListGroup.Item>
                ))}
              </ListGroup>
          </div>
          <div className="user_info"> 
          <Tab.Content>
                {this.state.list.map((user, index) => (
                  <Tab.Pane eventKey={`#user${index}`}>
                    <div><b>Name:</b> {user.firstName} {user.lastName}</div>
                    <div><b>Email:</b> {user.email}</div>
                    <div><b>Learning Targets:</b> {user.learningTargets.join(', ')}</div>
                    <div><b>Location:</b> {user.location}</div>
                    <Button className="mt-3" variant="success" onClick={(e) => { e.preventDefault(); this.onstartChat(user)}}>Start Chat</Button>
                  </Tab.Pane>
                ))}
              </Tab.Content>
          </div>
          </Tab.Container>
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