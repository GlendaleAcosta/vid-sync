import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from 'containers/Home';
import RoomPage from 'containers/RoomPage';

class App extends Component {
  render() {
    return (
      <Router>

        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/room/:roomId" component={RoomPage} />
        </div>

      </Router>
    );
  }
}

export default App;
