import React from 'react';
import EachBook from './EachBook';

class Book extends React.Component {

  render() {
    if (this.props.bookArray) {
      let books = this.props.bookArray.map((book) => {
        return (
          <EachBook bookElement={book} key={Math.random() * 2} updateMainState={this.props.updateMainState} />
        );
      });
      return books;
    } else {
      return;
    }
  }
}

export default Book;



