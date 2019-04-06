import React, { Component } from "react";

const Context = React.createContext();

export class Provider extends Component {
  state = {
    track_list: [
      { track: { track_name: "abc" } },
      { track: { track_name: "123" } },
      { track: { track_name: "xyz" } }
    ],
    heading: "Top 10 Tracks"
  };
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
// export the Consumer
export const Consumer = Context.Consumer;
