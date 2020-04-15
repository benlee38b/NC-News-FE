import React, { Component } from 'react';
import * as api from '../utils/api';

export class Voter extends Component {
  state = { voteChange: 0 };

  render() {
    const { voteChange } = this.state;
    return (
      <section className="voter">
        <button
          onClick={() => {
            this.handleClick(1);
          }}
          disabled={voteChange > 0}
        >
          Up
        </button>
        <p>Total votes: {this.props.votes + voteChange}</p>
        <button
          onClick={() => {
            this.handleClick(-1);
          }}
          disabled={voteChange < 0}
        >
          Down
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
