import React, { Component } from 'react';

export class FilterArticleListForm extends Component {
  state = {
    query: {},
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="filter-form">
        <label htmlFor="sort-by">
          Sort articles:
          <select name="sort_by" id="sort-by" onChange={this.handleChange}>
            <option value="">-</option>
            <option value="created_at">Date created</option>
            <option value="votes">Votes</option>
            <option value="comment_count">Number of comments</option>
          </select>
        </label>
        <label
          htmlFor="
          order"
        >
          Order:
          <select name="order" id="order" onChange={this.handleChange}>
            <option value="">-</option>
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </label>
        <button type="submit" id="form-submit-button">
          Submit
        </button>
      </form>
    );
  }

  handleChange = (event) => {
    let queryObj = {};
    queryObj[event.target.name] = event.target.value;

    this.setState((currentState) => {
      return { query: { ...currentState.query, ...queryObj } };
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.fetchArticles(this.state.query);
  };
}

export default FilterArticleListForm;
