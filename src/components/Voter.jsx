import React, { Component } from 'react';
import * as api from '../utils/api';

export class Voter extends Component {
  state = { voteChange: 0, error: null };

  render() {
    const { type } = this.props;
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
          <i
            id={type === 'articles' ? 'up-voting-icon' : 'comment-voter-up'}
            className="far fa-arrow-alt-circle-up"
          ></i>
        </button>
        <p>
          <span className="total-votes-title">Total votes:</span>
          <strong>{this.props.votes + voteChange}</strong>
        </p>
        <button
          id="down-voting-button"
          onClick={() => {
            this.handleClick(-1);
          }}
          disabled={voteChange < 0}
        >
          <i
            id={type === 'articles' ? 'down-voting-icon' : 'comment-voter-down'}
            className="far fa-arrow-alt-circle-down"
          ></i>
        </button>
      </section>
    );
  }

  handleClick = (newVotes) => {
    api.patchVotes(this.props, newVotes).catch((err) => {
      console.dir(err);
      this.setState({
        error: {
          status: err.response.status,
          msg: err.response.data.message,
        },
        isLoading: false,
      });
    });
    this.setState((currentState) => {
      return { voteChange: currentState.voteChange + newVotes };
    });
  };
}

export default Voter;
