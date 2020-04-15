import React, { Component } from 'react';

export class FilterArticleListForm extends Component {
  state = {
    query: {},
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="sort-by">Sort articles by:</label>
        <select name="sort_by" id="sort-by" onChange={this.handleChange}>
          <option value="">-</option>
          <option value="created_at">Date created</option>
          <option value="votes">Votes</option>
          <option value="comment_count">Number of comments</option>
        </select>
        <select name="order" id="order" onChange={this.handleChange}>
          <option value="">-</option>
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    );
  }

  handleChange = (event) => {
    let queryObj = {};
    queryObj[event.target.name] = event.target.value;
    console.log(event.target.name);
    // for (let key in queryObj) {
    //   if (queryObj[key] === '') {
    //     delete queryObj[key];
    //     console.log(queryObj);
    //   }
    // }
    this.setState(
      (currentState) => {
        return { query: { ...currentState.query, ...queryObj } };
      },
      () => {
        console.log(this.state);
      }
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleFilteredArticles(this.state.query);
  };
}

export default FilterArticleListForm;
