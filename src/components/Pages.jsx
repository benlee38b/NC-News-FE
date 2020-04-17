import React from 'react';

export const Pages = (props) => {
  console.log(props);

  const handleClick = (page) => {
    props.fetchArticles({ p: page });
  };

  return (
    <ul className="pages">
      {props.pages.map((page, index) => {
        return (
          <li key={page + index} onClick={() => handleClick(page)}>
            {page}
          </li>
        );
      })}
    </ul>
  );
};
