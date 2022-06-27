import React from 'react';

class Button extends React.Component {
  render() {
    return (
      <div className="open-search">
        <button onClick={this.props.changePage}>Add a book</button>
      </div>
    );
  }
}

export default Button;
