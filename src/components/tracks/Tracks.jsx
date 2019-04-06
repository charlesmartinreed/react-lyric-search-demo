import React, { Component } from "react";
import { Consumer } from "../../context";

// bringing in the consumer allows us to grab hold of the Global Context
// wrap your other components in your Consumer, enabling the use of props from the global context, regardless of how many levels deep your particular component may be

class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          console.log(value);
          return <h1>Tracks</h1>;
        }}
      </Consumer>
    );
  }
}

export default Tracks;
