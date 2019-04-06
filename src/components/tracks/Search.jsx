import React, { Component } from "react";
import { Consumer } from "../../context";
import axios from "axios";

// created as a form
// in react, it is common for each piece of the form to have its own state
// again, we use a Consumer to give us access to the global scope from the global state. vValue includes the entire state
class Search extends Component {
  state = {
    trackTitle: ""
  };

  // [e.target.name] works to set the corresponding key because the name and the key are the same.
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // dispatch function expects a action type and a payload
  // we send the track list pulled from the API response as the payload to our dispatch function

  // make a request to the API for lyrics
  findTrack = (dispatch, e) => {
    e.preventDefault();

    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${
          this.state.trackTitle
        }&page_size=10&page=1&s_track_rating=desc&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
      .then(res => {
        dispatch({
          type: "SEARCH_TRACKS",
          payload: res.data.message.body.track_list
        });

        this.setState({ trackTitle: "" });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // global state, accessed via the consumer component, gives us value, which in turn gives us our dispatch function
  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music" /> Search For A Song
              </h1>
              <p className="lead text-center">Get lyrics for any song</p>
              <form onSubmit={this.findTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Song title..."
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={this.onChange}
                  />
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block mb-5"
                  type="submit"
                >
                  Find Lyrics
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
