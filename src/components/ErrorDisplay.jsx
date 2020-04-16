import React from 'react';

export const ErrorDisplay = (props) => {
  return (
    <section>
      <h2>Gosh looks like something went wrong!</h2>
      <p>
        Error code: {props.status}, {props.msg}
      </p>
    </section>
  );
};
