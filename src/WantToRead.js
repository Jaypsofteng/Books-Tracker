import React from 'react';
import Book from './Book';

class WantToRead extends React.Component {
    render() {
        return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Want to Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid want-to-read ">
            <Book bookArray={this.props.bookArray} updateMainState={this.props.updateMainState}/>
          </ol>
        </div>
      </div>
      );
    }
}

export default WantToRead;