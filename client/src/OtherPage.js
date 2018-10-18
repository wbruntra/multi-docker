import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Other extends Component {
  render() {
    return (
      <div>
        I am another page.
        <Link to="/">Go back home</Link>
      </div>
    );
  }
}

export default Other;
