import React, { Component } from 'react';
import * as api from '../utils/api';

export class Voter extends Component {
  state = { voteChange: 0 };

  render() {
    const { voteChange } = this.state;
    return (
      <section className="voter">
        <button
          id="up-voting-button"
          onClick={() => {
            this.handleClick(1);
          }}
          disabled={voteChange > 0}
        >
          <i id="up-voting-icon" className="far fa-arrow-alt-circle-up"></i>
        </button>
        <p>Total votes: {this.props.votes + voteChange}</p>
        <button
          id="down-voting-button"
          onClick={() => {
            this.handleClick(-1);
          }}
          disabled={voteChange < 0}
        >
          <i id="down-voting-icon" className="far fa-arrow-alt-circle-down"></i>
        </button>
      </section>
    );
  }

  handleClick = (votes) => {
    api.patchVotes(this.props, votes);
    this.setState((currentState) => {
      return { voteChange: currentState.voteChange + votes };
    });
  };
}

export default Voter;
