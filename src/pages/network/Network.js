import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Widget, addResponseMessage} from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

import './network.css';
import Socket from '../../socket';

/**
 * Main React Component for the networking page (WYSIWIG, Chat, Video, Canvas)
 */
class NetworkPage extends Component {
  constructor(props) {
    // TODO: set state and handlers for chat message and WYSIWIG
    super(props);
  }
  handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
    Socket.connect(user => {
      user.emit("chat", newMessage, this.props.withUser);
    });
  }
  componentDidMount() {
    Socket.connect(user => {
      user.on("chat", (message) =>{
        addResponseMessage(message);
      })
    });
  }
  componentWillUnmount() {
    // TODO: cleanup listeners for chat/editor sockets
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
            <span>TODO: add tabs for Canvas and WYSIWIG</span>
            { 
              // TODO: add tabs for Canvas and WYSIWIG }
            }
          </Col>
          <Col>
            <div>TODO: add VideoChat element
              {
                // TODO: add video chat element
              }
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default NetworkPage;
