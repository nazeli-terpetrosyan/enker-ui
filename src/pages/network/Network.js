import React, { Component } from 'react';
import { Container, Col, Row, Tab, Tabs } from 'react-bootstrap';
import { Widget, addResponseMessage} from 'react-chat-widget';
import ReactQuill from 'react-quill';
import VideoChat from "./VideoChat"
import Drawing from './Drawing';

import 'react-chat-widget/lib/styles.css';
import 'react-quill/dist/quill.snow.css';

import './network.css';
import Socket from '../../socket';

/**
 * Main React Component for the networking page (WYSIWIG, Chat, Video, Canvas)
 */
class NetworkPage extends Component {
  constructor(props) {
    // TODO: set state and handlers for chat message and WYSIWIG
    super(props);
    this.state = { text: '' } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(source, editor) {
    if(source === "user"){
      Socket.connect(user =>{
        user.emit("document", editor.getContents(), this.props.withUser);
      });
    }
  }
  handleNewUserMessage = (newMessage) => {  
    // Now send the message throught the backend API
    Socket.connect(user => {
      user.emit("chat", newMessage, this.props.withUser);
    });
  }
  componentDidMount() {
    Socket.connect(user => {
      user.on("chat", (message) =>{
        addResponseMessage(message);
      });
      user.on("document", (text) => {
        this.setState({text: text});
      });
    });
  }
  componentWillUnmount() {
    // TODO: cleanup listeners for chat/editor sockets
    Socket.connect(user =>{
      user.removeListener('chat');
      user.removeListener('document');
    })
  }
  render() {
    return (
      <Container fluid={true} className="p-0">
        { 
          // TODO: Add chat widget 
          <Widget
          handleNewUserMessage={this.handleNewUserMessage}
        />
        } 
        <Row noGutters={true}>
          <Col>
            { 
              <Tabs defaultActiveKey="document" id="uncontrolled-tab-example">
              <Tab eventKey="document" title="Document">
              <ReactQuill value={this.state.text}
                  onChange={(content, delta, source, editor) =>{this.handleChange(source, editor)}} />
              </Tab>
              <Tab eventKey="canvas" title="Canvas">
              <Drawing withUser={this.props.withUser} currentUser={this.props.currentUser} />
              </Tab>
            </Tabs>
            }
          </Col>
          <Col>
            <div>
              <VideoChat 
                user = {this.props.user}
                caller = {this.props.receiver ? this.props.withUser: this.props.user}
                receiver = {this.props.receiver ? this.props.user: this.props.withUser}
                />
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default NetworkPage;
